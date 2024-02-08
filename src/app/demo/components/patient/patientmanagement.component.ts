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
import * as XLSX from 'xlsx';
import { FormControl  } from '@angular/forms';

@Component({
    selector: 'app-patientmanagement',
    templateUrl: './patientmanagement.component.html',
    styleUrls: ['./patientmanagement.component.css'],
})
export class PatientmanagementComponent {
    formattedPayments: any = [];
    filename: string = `Clinicx Patients.xlsx`;
    exportexcel() {
        for (const patientmanagement of this.patientmanagement) {
            this.formattedPayments.push({
                'First Name': patientmanagement.first_name,
                'Last Name': patientmanagement.last_name,
                Email: patientmanagement.email,
                'Marital Status': patientmanagement.marital_status,
                'Phone Number': patientmanagement.phone_number,
                Address: patientmanagement.address,
                'Blood Group': patientmanagement.blood_group,
                'Date of Birth': patientmanagement.date_of_birth,
                About: patientmanagement.about,
            });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
            this.formattedPayments
        );

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, this.filename);
    }

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
    tablevisible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    showtableDialog() {
        if (this.selectedpatientmanagement.length !== 0) {
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
            .fetchAppointmentsPatient(this.selectedpatientmanagement[0])
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
        this.fetchpatientmanagement();
        this.selectedpatientmanagement = [];
        this.selecteddoctorname = [];
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
            this.selecteddoctorname = [];

            this.selectedpatientmanagement.push(patientmanagement.id);
            this.patientmanagement.filter((item) => {
                if (this.selectedpatientmanagement[0] === item.id) {
                    return this.selecteddoctorname.push(item.first_name);
                }
            });
            this.fetchappointments();
        } else {
            this.selectedpatientmanagement = [];
            this.selecteddoctorname = [];
        }
        console.log(this.selectedpatientmanagement);
    }

    // Define the custom validator function for future dates
    futureDateValidator(control: FormControl) {
        const selectedDate = new Date(control.value);
        const currentDate = new Date();
        if (selectedDate > currentDate) {
            return { futureDate: true };
        }
        return null;
    }
    patientmanagementForm = this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        marital_status: ['', Validators.required],
        phone_number: ['', Validators.required],
        address: ['', Validators.required],
        blood_group: ['', Validators.required],
        date_of_birth: ['', [Validators.required, this.futureDateValidator]],
        about: ['', Validators.required],
        gender: ['', Validators.required],
        // user_image:['', Validators.required],
    });

    maritalOptions = [
        { name: 'Married' },
        { name: 'Divorced' },
        { name: 'Widowed' },
        { name: 'Single' },
    ];
    genderOptions = [{ name: 'Female' }, { name: 'Male' }];
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
                )[0].toUpperCase(),
                gender: Object.values(
                    this.patientmanagementForm.value.gender
                )[0].toUpperCase(),
                blood_group: Object.values(
                    this.patientmanagementForm.value.blood_group
                )[0].toUpperCase(),
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
                    if (response) {
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
                        summary: error.error.detail,
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
                )[0].toUpperCase(),
                gender: Object.values(
                    this.patientmanagementForm.value.gender
                )[0].toUpperCase(),
                blood_group: Object.values(
                    this.patientmanagementForm.value.blood_group
                )[0].toUpperCase(),
            };

            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice
                .updatePatients(this.selectedpatientmanagement, payload)
                .subscribe(
                    (response: any) => {
                        // Handle the API response
                        console.log('API response:', response);
                        if (response) {
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
                            summary: error.error.detail,
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
                        severity: 'success',
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