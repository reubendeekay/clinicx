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
    selector: 'app-patientmanagement',
    templateUrl: './patientmanagement.component.html',
    styleUrls: ['./patientmanagement.component.css'],
})
export class PatientmanagementComponent {
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
    patientmanagement: any;
    mode: string = 'add';
    selectedpatientmanagement: any = [];
    selectedPatientmanagement: any;

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    ngOnInit() {
        this.fetchpatientmanagement();
        this.selectedpatientmanagement = [];
    }

    fetchpatientmanagement() {
        this.apiservice.fetchPatients().subscribe(
            (response: any) => {
                // Handle the API response
                console.log('API response:', response);

                this.patientmanagement = response;
                // this.patientmanagementForm.controls['code'].setValue(this.patientmanagement.length + 1);
            },
            (error) => {
                // Handle the API error
                console.error('API error:', error);
            }
        );
    }

    class: any = 'p-datatable-sm';

    onCheckboxChange(event: any, patientmanagement: any) {
        console.log(patientmanagement.id);

        if (event.target.checked) {
            this.selectedpatientmanagement = [];

            this.selectedpatientmanagement.push(patientmanagement.id);
        } else {
            this.selectedpatientmanagement = [];
        }
        console.log(this.selectedpatientmanagement);
    }

    patientmanagementForm = this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        marital_status: ['', Validators.required],
        phone_number: ['', Validators.required],
        address: ['', Validators.required],
        blood_group: ['', Validators.required],
        date_of_birth: ['', Validators.required],
        about: ['', Validators.required],
        gender: ['', Validators.required],
        // user_image:['', Validators.required],
    });

    maritalOptions = [
        { name: 'Married' },
        { name: 'Single' },
        { name: 'Other' },
    ];
    genderOptions = [{ name: 'Female' }, { name: 'Male' }, { name: 'Other' }];
    bloodOptions = [
        { name: 'A+' },
        { name: 'O-' },
        { name: 'O+' },
        { name: 'B+' },
        { name: 'AB' },
    ];

    addpatientmanagement() {
        this.mode = 'add';

       

        if (this.patientmanagementForm.valid) {
            const payload = {
                id: this.selectedpatientmanagement[0],
                ...this.patientmanagementForm.value,
                user_image:
                    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
                marital_status: Object.values(
                    this.patientmanagementForm.value.marital_status
                )[0],
                gender: Object.values(
                    this.patientmanagementForm.value.gender
                )[0],
                blood_group: Object.values(
                    this.patientmanagementForm.value.blood_group
                )[0],
                // date_of_birth:
                //     this.patientmanagementForm.value.date_of_birth +
                //     '07T11:38:20.960000',
                date_of_birth: '2024-02-07T19:10:33.738Z',
            };

            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice.createPatients(payload).subscribe(
                (response: any) => {
                    // Handle the API response
                    console.log('API response:', response);
                    if (response.success) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Confirmed',
                            detail: 'You have successfully created a Patient',
                        });

                        setTimeout(() => {
                            this.visible = false;
                        }, 2000);
                        this.route.navigate(['/dashboard/patientmanagement']);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Patient Creation Failed. Try again Later!',
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
                        detail: 'Patient Creation Failed. Try again Later!',
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
                detail: 'Patient Creation Failed. Try again Later!',
            });
        }
    }

    editPatientmanagement(patientmanagement: any) {
        if (this.selectedpatientmanagement.length !== 0) {
            this.visible = true;
            this.mode = 'edit';
            console.log(this.mode);
            if (patientmanagement) {
                this.selectedPatientmanagement = { ...patientmanagement };
                this.patientmanagementForm.patchValue({
                    first_name: patientmanagement.first_name,
                    last_name: patientmanagement.last_name,
                    about: patientmanagement.about,
                    address: patientmanagement.address,
                    email: patientmanagement.email,
                    phone_number: patientmanagement.phone_number,
                    blood_group: patientmanagement.blood_group,
                    marital_status: patientmanagement.marital_status,
                    date_of_birth: patientmanagement.date_of_birth,
                });
            } else {
                this.selectedPatientmanagement = null;
                this.patientmanagementForm.reset();
            }
        } else {
            this.messageService.add({
                severity: 'info',
                summary: 'Notification',
                detail: 'Please Select a Patient',
            });
        }
    }

    updatePatientmanagement() {
        if (this.patientmanagementForm.valid) {
            const payload = {
                ...this.patientmanagementForm.value,
                date_of_birth:
                    this.patientmanagementForm.value.date_of_birth +
                    'T17:27:57.539Z',
                user_image:
                    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
                marital_status: Object.values(
                    this.patientmanagementForm.value.marital_status
                )[0],
                gender: Object.values(
                    this.patientmanagementForm.value.gender
                )[0],
                blood_group: Object.values(
                    this.patientmanagementForm.value.blood_group
                )[0],
            };

            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice
                .updatePatients(this.selectedpatientmanagement, payload)
                .subscribe(
                    (response: any) => {
                        // Handle the API response
                        console.log('API response:', response);
                        if (response.success) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Confirmed',
                                detail: 'You have succesfully Updated the Patient',
                            });

                            setTimeout(() => {
                                this.visible = false;
                            }, 2000);
                            this.route.navigate(['/dashboard/patient']);
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Patientmanagement Update Failed. Try again Later!',
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
                            detail: 'Patientmanagement Update Failed. Try again Later!',
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
                detail: 'Patient Update Failed. Try again Later!',
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
                if (this.selectedpatientmanagement.length !== 0) {
                    this.apiservice
                        .deletePatients(this.selectedpatientmanagement)
                        .subscribe(
                            (response: any) => {
                                // Handle the API response
                                console.log('API response:', response);

                                // Refresh the servicees after deletion
                                this.fetchpatientmanagement();
                            },
                            (error) => {
                                // Handle the API error
                                console.error('API error:', error);
                            }
                        );
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Confirmed',
                        detail: 'You have successfully deleted the patient',
                    });
                } else {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Notification',
                        detail: 'Please Select a patient',
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
