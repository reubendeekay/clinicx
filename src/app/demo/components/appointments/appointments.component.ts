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
import * as XLSX from 'xlsx';
import { DialogModule } from 'primeng/dialog';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
    selector: 'app-appointments',
    templateUrl: './appoinments.component.html',
    styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent {
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
    appointments: any;
    mode: string = 'add';
    selectedappointments: any = [];
    selectedAppointments: any;

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    ngOnInit() {
        this.fetchappointments();
        this.selectedappointments = [];
        this.fetchdoctormanagement();
        this.fetchservicees();
        this.fetchpatientmanagement();
    }

    formattedRecords: any = [];
    filename: string = `Clinicx Appointments.xlsx`;
    exportexcel() {
        for (const appointments of this.appointments) {
            this.formattedRecords.push({
                patient_id: appointments.patient_id,
                doctor_id: appointments.doctor_id,
                service_id: appointments.service_id,
                appointment_date: appointments.appointment_date,
                appointment_time: appointments.appointment_time,
                reason: appointments.reason,
            });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
            this.formattedRecords
        );

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, this.filename);
    }

    fetchappointments() {
        this.apiservice.fetchAppointments().subscribe(
            (response: any) => {
                // Handle the API response
                console.log('API response:', response);

                this.appointments = response;
                // this.appointmentsForm.controls['code'].setValue(this.appointments.length + 1);
            },
            (error) => {
                // Handle the API error
                console.error('API error:', error);
            }
        );
    }
    alldoctors: any = [];
    doctors: any = [];
    services: any = [];
    allservices: any = [];
    allPatients: any = [];
    patients: any = [];

    fetchservicees() {
        this.apiservice.fetchServices().subscribe(
            (response: any) => {
                // Handle the API response
                console.log('API response:', response);

                this.allservices = response;
                response.map((item) => this.services.push({ name: item.name }));
            },
            (error) => {
                // Handle the API error
                console.error('API error:', error);
            }
        );
    }

    fetchpatientmanagement() {
        this.apiservice.fetchPatients().subscribe((response: any) => {
            // Handle the API response
            console.log('API response:', response);

            this.allPatients = response;
            response;
            response.map((item) =>
                this.patients.push({ name: item.phone_number })
            );
            (error) => {
                // Handle the API error
                console.error('API error:', error);
            };
        });
    }

    fetchdoctormanagement() {
        this.apiservice.fetchDoctors().subscribe(
            (response: any) => {
                // Handle the API response
                console.log('API response:', response);

                this.alldoctors = response;

                response.map((item) =>
                    this.doctors.push({ name: item.user.phone_number })
                );
                console.log('doctors' + JSON.stringify(this.doctors));
            },
            (error) => {
                // Handle the API error
                console.error('API error:', error);
            }
        );
    }

    deleteSelectedAppointments() {}

    class: any = 'p-datatable-sm';

    onCheckboxChange(event: any, appointments: any) {
        if (event.target.checked) {
            this.selectedappointments = [];

            this.selectedappointments.push(appointments.id);
        } else {
            this.selectedappointments = [];
        }
        console.log(this.selectedappointments);
    }

    appointmentsForm = this.fb.group({
        patient_id: ['', Validators.required],
        doctor_id: ['', Validators.required],
        service_id: ['', Validators.required],
        appointment_date: ['', Validators.required],
        appointment_time: ['', Validators.required],
        reason: ['', Validators.required],
    });

    addappointments() {
        this.mode = 'add';

        if (this.appointmentsForm.valid) {
            const serviceID = this.allservices.filter((item) => {
                if (
                    item.name ==
                    Object.values(this.appointmentsForm.value.service_id)
                ) {
                    return item.id;
                }
            })[0].id;
            const patientID = this.allPatients.filter((item) => {
                if (
                    item.phone_number ==
                    Object.values(this.appointmentsForm.value.patient_id)
                ) {
                    return item.id;
                }
            })[0].id;
            const doctor = this.alldoctors.filter((item) => {
                if (
                    item.user.phone_number ==
                    Object.values(this.appointmentsForm.value.doctor_id)
                ) {
                    return item.id;
                }
            })[0];

            const doctorID = doctor ? doctor.id : null;
            const payload = {
                ...this.appointmentsForm.value,
                service_id: serviceID,
                patient_id: patientID,
                doctor_id: doctorID,
            };

            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice.createAppointments(payload).subscribe(
                (response: any) => {
                    // Handle the API response
                    console.log('API response:', response);
                    if (response) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Confirmed',
                            detail: 'You have successfully created a Appointments',
                        });

                        setTimeout(() => {
                            this.visible = false;
                        }, 2000);
                        this.route.navigate(['/dashboard/appointments']);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Appointments Creation Failed. Try again Later!',
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
                        detail: 'Appointments Creation Failed. Try again Later!',
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
                detail: 'Appointments Creation Failed. Try again Later!',
            });
        }
    }

    editAppointments(appointments: any) {
        if (this.selectedappointments.length !== 0) {
            this.visible = true;
            this.mode = 'edit';
            console.log(this.mode);
            if (appointments) {
                this.selectedAppointments = { ...appointments };
                this.appointmentsForm.patchValue({
                    patient_id: appointments.patient_id,
                    doctor_id: appointments.doctor_id,
                    service_id: appointments.service_id,
                    appointment_date: appointments.appointment_date,
                    appointment_time: appointments.appointment_time,
                    reason: appointments.reason,
                });
            } else {
                this.selectedAppointments = null;
                this.appointmentsForm.reset();
            }
        } else {
            this.messageService.add({
                severity: 'info',
                summary: 'Notification',
                detail: 'Please Select a Appointments',
            });
        }
    }

    updateAppointments() {
        if (this.appointmentsForm.valid) {
            const serviceID = this.allservices.filter((item) => {
                if (
                    item.name ==
                    Object.values(this.appointmentsForm.value.service_id)
                ) {
                    return item.id;
                }
            })[0].id;
            const patientID = this.allPatients.filter((item) => {
                if (
                    item.phone_number ==
                    Object.values(this.appointmentsForm.value.patient_id)
                ) {
                    return item.id;
                }
            })[0].id;
            const doctor = this.alldoctors.filter((item) => {
                if (
                    item.user.phone_number ==
                    Object.values(this.appointmentsForm.value.doctor_id)
                ) {
                    return item.id;
                }
            })[0];

            const doctorID = doctor ? doctor.id : null;
            const payload = {
                ...this.appointmentsForm.value,
                service_id: serviceID,
                patient_id: patientID,
                doctor_id: doctorID,
            };
            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice
                .updateAppointments(this.selectedappointments, payload)
                .subscribe(
                    (response: any) => {
                        // Handle the API response
                        console.log('API response:', response);
                        if (response) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Confirmed',
                                detail: 'You have succesfully Updated the Appointments',
                            });

                            setTimeout(() => {
                                this.visible = false;
                            }, 2000);
                            this.route.navigate(['/dashboard/appointments']);
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Appointments Update Failed. Try again Later!',
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
                            detail: 'Appointments Update Failed. Try again Later!',
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
                detail: 'Appointments Update Failed. Try again Later!',
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
                if (this.selectedappointments.length !== 0) {
                    this.apiservice
                        .deleteAppointments(this.selectedappointments)
                        .subscribe(
                            (response: any) => {
                                // Handle the API response
                                console.log('API response:', response);

                                // Refresh the servicees after deletion
                                this.fetchappointments();
                            },
                            (error) => {
                                // Handle the API error
                                console.error('API error:', error);
                            }
                        );
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Confirmed',
                        detail: 'You have successfully deleted the appointments',
                    });
                } else {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Notification',
                        detail: 'Please Select a appointments',
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
