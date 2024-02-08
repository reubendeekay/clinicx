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
    selector: 'app-doctormanagement',
    templateUrl: './doctormanagement.component.html',
    styleUrls: ['./doctormanagement.component.css'],
})
export class DoctormanagementComponent {
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
    doctormanagement: any;
    mode: string = 'add';
    selecteddoctormanagement: any = [];
    selectedDoctormanagement: any;
    branches: any = [];

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    showtableDialog() {
        if (this.selecteddoctormanagement.length !== 0) {
            this.tablevisible = true;
        } else {
             this.messageService.add({
                 severity: 'info',
                 summary: 'Notification',
                 detail: 'Please Select a Doctor',
             });
        }
    }

    appointments: any = [];

    fetchappointments() {
        this.apiservice
            .fetchAppointmentsPatient(this.selecteddoctormanagement[0])
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

    ngOnInit() {
        this.fetchdoctormanagement();
        this.selecteddoctorname = [];
        this.selecteddoctormanagement = [];
        this.fetchUsers();
        this.fetchbranches();
    }

    fetchbranches() {
        this.apiservice.fetchBranches().subscribe(
            (response: any) => {
                // Handle the API response
                console.log('API response:', response);
                this.allBranches = response;
                response.map((item) => this.branches.push({ name: item.name }));
                // this.branchForm.controls['code'].setValue(this.branches.length + 1);
            },
            (error) => {
                // Handle the API error
                console.error('API error:', error);
            }
        );
    }
    tablevisible: any = false;

    users: any = [];
    fetchUsers() {
        this.apiservice.fetchUsers().subscribe(
            (response: any) => {
                // Handle the API response
                console.log('API response:', response);
                this.allUsers = response;
                response.map((item) =>
                    this.users.push({ name: item.phone_number })
                );
                // this.branchForm.controls['code'].setValue(this.branches.length + 1);
            },
            (error) => {
                // Handle the API error
                console.error('API error:', error);
            }
        );
    }

    fetchdoctormanagement() {
        this.apiservice.fetchDoctors().subscribe(
            (response: any) => {
                // Handle the API response
                console.log('API response:', response);

                this.doctormanagement = response;
            },
            (error) => {
                // Handle the API error
                console.error('API error:', error);
            }
        );
    }

    class: any = 'p-datatable-sm';
    selecteddoctorname: any = [];

    onCheckboxChange(event: any, doctormanagement: any) {
        console.log(doctormanagement.id);

        if (event.target.checked) {
            this.selecteddoctormanagement = [];
            this.selecteddoctorname = [];

            this.selecteddoctormanagement.push(doctormanagement.id);
            this.doctormanagement.filter((item) => {
                if (this.selecteddoctormanagement[0] === item.id) {
                    return this.selecteddoctorname.push(item.user.first_name);
                }
            });
            console.log(this.selecteddoctorname);
            this.fetchappointments();
        } else {
            this.selecteddoctorname = [];
            this.selecteddoctormanagement = [];
        }
        console.log(this.selecteddoctormanagement);
    }

    doctormanagementForm = this.fb.group({
        user_id: ['', Validators.required],
        branch_id: ['', Validators.required],
    });

    adddoctormanagement() {
        this.mode = 'add';

        if (this.doctormanagementForm.valid) {
            const branchId = this.allBranches.filter((item) => {
                if (
                    item.name ==
                    Object.values(this.doctormanagementForm.value.branch_id)
                ) {
                    return item.id;
                }
            })[0].id;
            const userId = this.allUsers.filter((item) => {
                if (
                    item.phone_number ==
                    Object.values(this.doctormanagementForm.value.user_id)
                ) {
                    return item.id;
                }
            })[0].id;
            const payload = {
                branch_id: branchId,
                user_id: userId,
            };

            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice.createDoctors(payload).subscribe(
                (response: any) => {
                    // Handle the API response
                    console.log('API response:', response);
                    if (response) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Confirmed',
                            detail: 'You have successfully created a Doctor',
                        });

                        setTimeout(() => {
                            this.visible = false;
                        }, 2000);
                        this.route.navigate(['/dashboard/doctormanagement']);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Doctor Creation Failed. Try again Later!',
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
                        detail: 'Doctor Creation Failed. Try again Later!',
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
                detail: 'Doctor Creation Failed. Try again Later!',
            });
        }
    }

    editDoctormanagement(doctormanagement: any) {
        if (this.selecteddoctormanagement.length !== 0) {
            this.visible = true;
            this.mode = 'edit';
            console.log(this.mode);
            if (doctormanagement) {
                this.selectedDoctormanagement = { ...doctormanagement };
                this.doctormanagementForm.patchValue({
                    branch_id: doctormanagement.branch_id,
                    user_id: doctormanagement.user_id,
                });
            } else {
                this.selectedDoctormanagement = null;
                this.doctormanagementForm.reset();
            }
        } else {
            this.messageService.add({
                severity: 'info',
                summary: 'Notification',
                detail: 'Please Select a Doctor',
            });
        }
    }

    updateDoctormanagement() {
        if (this.doctormanagementForm.valid) {
            const payload = {
                ...this.doctormanagementForm.value,
                branch_id: this.allBranches.filter((item) => {
                    if (
                        item.name ==
                        Object.values(this.doctormanagementForm.value.branch_id)
                    ) {
                        return item.id;
                    }
                })[0].id,
            };

            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice
                .updateDoctors(this.selecteddoctormanagement, payload)
                .subscribe(
                    (response: any) => {
                        // Handle the API response
                        console.log('API response:', response);
                        if (response) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Confirmed',
                                detail: 'You have succesfully Updated the Doctor',
                            });

                            setTimeout(() => {
                                this.visible = false;
                            }, 2000);
                            this.route.navigate(['/dashboard/doctor']);
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Doctor management Update Failed. Try again Later!',
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
                            detail: 'Doctor management Update Failed. Try again Later!',
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
                detail: 'Doctor Update Failed. Try again Later!',
            });
        }
    }

    allBranches: any = [];
    allUsers: any = [];

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
                if (this.selecteddoctormanagement.length !== 0) {
                    this.apiservice
                        .deleteDoctors(this.selecteddoctormanagement)
                        .subscribe(
                            (response: any) => {
                                // Handle the API response
                                console.log('API response:', response);

                                // Refresh the servicees after deletion
                                this.fetchdoctormanagement();
                            },
                            (error) => {
                                // Handle the API error
                                console.error('API error:', error);
                            }
                        );
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Confirmed',
                        detail: 'You have successfully deleted the doctor',
                    });
                } else {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Notification',
                        detail: 'Please Select a doctor',
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