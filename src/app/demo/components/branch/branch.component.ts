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
import * as XLSX from 'xlsx';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-branch',
    templateUrl: './branch.component.html',
    styleUrls: ['./branch.component.css'],
})
export class BranchComponent {
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

    visible: boolean = false;

    formattedPayments: any = [];
    filename: string = `Clinicx Branches.xlsx`;
    exportexcel() {
        for (const branch of this.branches) {
            this.formattedPayments.push({
                name: branch.name,
                description: branch.description,
                address: branch.address,
                phone_number: branch.phone_number,
                longitude: branch.longitude,
                latitude: branch.latitude,
            });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
            this.formattedPayments
        );

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, this.filename);
    }

    showDialog() {
        this.visible = true;
    }
    tablevisible: any = false;

    showtableDialog() {
        if (this.selectedbranch.length !== 0) {
            this.tablevisible = true;
        } else {
            this.messageService.add({
                severity: 'info',
                summary: 'Notification',
                detail: 'Please Select a Branch',
            });
        }
    }
    appointments: any = [];

    fetchappointments() {
        this.apiservice
            .fetchAppointmentsPatient(this.selectedbranch[0])
            .subscribe(
                (response: any) => {
                    // Handle the API response
                    console.log('API response:', response);

                    this.appointments = response;
                    // this.appointmentsForm.controls['code'].setValue(this.appointments.length + 1);
                },
                (error) => {
                    // Handle the API error
                    console.error('API error:', error.detail);
                }
            );
    }
    selecteddoctorname: any = [];

    ngOnInit() {
        this.fetchbranches();
        this.selectedbranch = [];
        this.selecteddoctorname = [];
    }

    fetchbranches() {
        this.apiservice.fetchBranches().subscribe(
            (response: any) => {
                // Handle the API response
                console.log('API response:', response);

                this.branches = response;
                // this.branchForm.controls['code'].setValue(this.branches.length + 1);
            },
            (error) => {
                // Handle the API error
                console.error('API error:', error);
            }
        );
    }

    deleteSelectedBranches() {}

    class: any = 'p-datatable-sm';

    onCheckboxChange(event: any, branch: any) {
        console.log(branch.id);
        this.fetchappointments();

        if (event.target.checked) {
            this.selectedbranch = [];

            this.selectedbranch.push(branch.id);
            this.selecteddoctorname = [];

            this.selectedbranch.push(this.branches.id);
            this.branches.filter((item) => {
                if (this.selectedbranch[0] === item.id) {
                    return this.selecteddoctorname.push(item.name);
                }
            });
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
                    if (response) {
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
                        summary: error.error.detail,
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
                        if (response) {
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
                            summary: error.error.detail,
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
                    this.apiservice.deleteBranch(this.selectedbranch).subscribe(
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
                        severity: 'success',
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
