import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../../../Services/api.service';
import { AuthService } from '../../../Services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-branch',
    templateUrl: './branch.component.html',
    styleUrls: ['./branch.component.css'],})
export class BranchComponent {
    search_query: string = ''; // Declare search_query property
    searchTerm: string = ''; // Declare searchTerm property
    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private toast: NgToastService,
        private route: Router,
        private auth: AuthService,
        private apiservice: ApiService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
    branches: any;
    mode: string = 'add';
    selectedbranch: any = [];
    selectedBranch: any;
    originalBranches: any;

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

   ngOnInit() {
    this.fetchbranches();
}
onAddressChange() {
    const address = this.branchForm.get('address')?.value;
    if (address) {
      this.getCoordinates(address);
    }
  }

  getCoordinates(address: string) {
    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = 'AIzaSyC3b-legecW26W0xiOOm9NUC0RyD1ZxeFY';
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    this.http.get<any>(apiUrl).subscribe(
      (response) => {
        if (response && response.results && response.results.length > 0) {
          const location = response.results[0].geometry.location;
          this.branchForm.patchValue({
            latitude: location.lat,
            longitude: location.lng
          });
        } else {
          console.error('Geocoding API response is empty or invalid.');
        }
      },
      (error) => {
        console.error('Error occurred while fetching coordinates:', error);
      }
    );
  }

fetchbranches() {
    this.apiservice.fetchBranches().subscribe(
        (response: any) => {
            this.branches = response;
            this.originalBranches = [...this.branches]; // Store the original branches
        },
        (error) => {
            console.error('API error:', error);
        }
    );
}

searchBranchesByName() {
    if (!this.search_query.trim()) {
        // If search query is empty or consists only of whitespace
        this.branches = [...this.originalBranches]; // Reset to original branches
        return;
    }
    // Filter branches by name
    this.branches = this.originalBranches.filter((branch: any) =>
        branch.name.toLowerCase().includes(this.search_query.toLowerCase())
    );
}
    

    deleteSelectedBranches() {
    }

    class: any = 'p-datatable-sm';

    onCheckboxChange(event: any, branch: any) {
        console.log(branch.id);

     if (event.target.checked) {
            this.selectedbranch = [];
         
            this.selectedbranch.push(branch.id);
        } else {
            this.selectedbranch = [];
        }
        console.log(this.selectedbranch);
    }

    branchForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        address: ['', Validators.required],
        phone_number: [
            '',
            [
                Validators.required,
                // Validators.pattern(
                //   /^(\+254\w?7\d{8}|\+2541\d{8}|\+25420\d{7}|\+25430\d{7}|\+25440\d{7}|\+25450\d{7}|\+25460\d{7}|\+25470\d{7}|\+25480\d{7}|\+25490\d{7})$/
                // ),
            ],
        ],
        longitude: ['', [Validators.required]],
        latitude: ['', [Validators.required]],
    });

    addbranch() {
        this.mode = 'add';

        if (this.branchForm.valid) {
            const payload = {
                id: this.selectedbranch[0],
                ...this.branchForm.value,
            };

            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice.createBranch(payload).subscribe(
                (response: any) => {
                    // Handle the API response
                    console.log('API response:', response);
                    if (response.success) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Confirmed',
                            detail: 'You have successfully created a Branch',
                        });

                        setTimeout(() => {
                            this.visible = false;
                        }, 2000);
                        this.route.navigate(['/dashboard/branch']);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Branch Creation Failed. Try again Later!',
                        });

                        setTimeout(() => {
                            this.visible = false;
                        }, 2000);
                    }
                },
                (error) => {
                    // Handle the API error
                    console.error('API error:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Branch Creation Failed. Try again Later!',
                    });
                    setTimeout(() => {
                        this.visible = false;
                    }, 2000);
                }
            );
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Branch Creation Failed. Try again Later!',
            });
        }
    }

    editBranch(branch: any) {
        if (this.selectedbranch.length !== 0) {
            this.visible = true;
            this.mode = 'edit';
            console.log(this.mode);
            if (branch) {
                this.selectedBranch = { ...branch };
                this.branchForm.patchValue({
                    name: branch.name,
                    description: branch.description,
                    address: branch.address,
                    phone_number: branch.phone_number,
                    longitude: branch.longitude,
                    latitude: branch.latitude,
                });
            } else {
                this.selectedBranch = null;
                this.branchForm.reset();
            }
        } else {
            this.messageService.add({
                severity: 'info',
                summary: 'Notification',
                detail: 'Please Select a Branch',
            });
        }
    }

    updateBranch() {
        if (this.branchForm.valid) {
            const payload = {
                ...this.branchForm.value,
            };

            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice
                .updateBranch(this.selectedbranch, payload)
                .subscribe(
                    (response: any) => {
                        // Handle the API response
                        console.log('API response:', response);
                        if (response.success) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Confirmed',
                                detail: 'You have succesfully Updated the Branch',
                            });

                            setTimeout(() => {
                                this.visible = false;
                            }, 2000);
                            this.route.navigate(['/dashboard/branch']);
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Branch Update Failed. Try again Later!',
                            });

                            setTimeout(() => {
                                this.visible = false;
                            }, 2000);
                        }
                    },
                    (error) => {
                        // Handle the API error
                        console.error('API error:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Branch Update Failed. Try again Later!',
                        });
                        setTimeout(() => {
                            this.visible = false;
                        }, 2000);
                    }
                );
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Branch Update Failed. Try again Later!',
            });
        }
    }

    confirm1(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
                if (this.selectedbranch.length !== 0) {
                    this.apiservice
                        .deleteBranch(this.selectedbranch)
                        .subscribe(
                            (response: any) => {
                                // Handle the API response
                                console.log('API response:', response);

                                // Refresh the servicees after deletion
                                this.fetchbranches();
                            },
                            (error) => {
                                // Handle the API error
                                console.error('API error:', error);
                            }
                        );
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Confirmed',
                        detail: 'You have successfully deleted the branch',
                    });
                } else {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Notification',
                        detail: 'Please Select a branch',
                    });
                }
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                    life: 3000,
                });
            },
        });
    }
}
