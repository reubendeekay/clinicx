import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../../../Services/api.service';
import { AuthService } from '../../../Services/auth.service';
import { HttpClient } from '@angular/common/http';
import { MessageService, ConfirmationService } from 'primeng/api';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent {
    class: any = 'p-datatable-sm';
    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private toast: NgToastService,
        private route: Router,
        private auth: AuthService,
        public layoutService: LayoutService,
        public apiservice: ApiService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}
    payments: any = [];
    mode: string = 'add';
    selectedpayments: any = [];
    selectedPayments: any;

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    ngOnInit() {
        this.fetchpaymentses();
        this.selectedpayments = [];
        this.fetchappointments();
    }

    fetchpaymentses() {
        this.apiservice.fetchPayments().subscribe(
            (response: any) => {
                // Handle the API response
                console.log('API response:', response);

                this.payments = response;
                // this.paymentsForm.controls['code'].setValue(this.paymentses.length + 1);
            },
            (error) => {
                // Handle the API error
                console.error('API error:', error);
            }
        );
    }

    // deleteSelectedPaymentses() {}

    onCheckboxChange(event: any, payments: any) {
        console.log(payments.id);

        if (event.target.checked) {
            this.selectedpayments = [];

            this.selectedpayments.push(payments.id);
        } else {
            this.selectedpayments = [];
        }
        console.log('fuck');
        console.log(this.selectedpayments);
    }

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

    paymentsForm = this.fb.group({
        appointment_id: ['', Validators.required],
        amount: ['', Validators.required],
        payment_date: ['', Validators.required],
        payment_mode: ['', Validators.required],
    });

    isStatusOptions: any = [{ name: 'true' }, { name: 'false' }];

    addpayments() {
        this.mode = 'add';
        // const active =

        if (this.paymentsForm.valid) {
            const payload = {
                ...this.paymentsForm.value,
            };

            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice.createPayment(payload).subscribe(
                (response: any) => {
                    // Handle the API response
                    console.log('API response:', response);
                    if (response) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Confirmed',
                            detail: 'You have successfully created a payments',
                        });

                        setTimeout(() => {
                            this.visible = false;
                        }, 2000);
                        this.route.navigate(['dashboard/payments']);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Payments Creation Failed. Try again Later!',
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
                        summary: error.error[0].detail,
                        detail: 'Payments Creation Failed. Try again Later!',
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
                detail: 'Payments Creation Failed. Try again Later!',
            });
        }
    }

    appointments: any = [];

    fetchappointments() {
        this.apiservice.fetchAppointments().subscribe(
            (response: any) => {
                // Handle the API response
                console.log('API response:', response);

                response.map((item) => this.appointments.push({ name: item.id }));
            console.log('appointments' + JSON.stringify(this.appointments));

            },
            (error) => {
                // Handle the API error
                console.error('API error:', error);
            }
        );
    }

    editPayments(payments: any) {
        if (this.selectedpayments.length !== 0) {
            this.visible = true;
            this.mode = 'edit';
            console.log(this.mode);
            if (payments) {
                this.selectedPayments = { ...payments };
                this.paymentsForm.patchValue({
                    appointment_id: payments.appointment_id,
                    amount: payments.amount,
                    payment_date: payments.payment_date,
                    payment_mode: payments.payment_mode,
                });
            } else {
                this.selectedPayments = null;
                this.paymentsForm.reset();
            }
        } else {
            this.messageService.add({
                severity: 'info',
                summary: 'Notification',
                detail: 'Please Select a payments',
            });
        }
    }

    formattedPayments: any = [];
    filename: string = `Clinicx Patients`;
    exportexcel() {
        for (const payments of this.payments) {
            this.formattedPayments.push({
                email: payments.email,
                phone_number: payments.phone_number,
                first_name: payments.first_name,
                last_name: payments.last_name,
                gender: payments.gender,
                marital_status: payments.marital_status,
                date_of_birth: payments.date_of_birth,
                password: payments.password,
            });
        }

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
            this.formattedPayments
        );

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, this.filename);
    }

    updatePayments() {
        if (this.paymentsForm.valid) {
            const payload = {
                ...this.paymentsForm.value,
            };

            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice
                .updatePayment(this.selectedpayments[0], payload)
                .subscribe(
                    (response: any) => {
                        // Handle the API response
                        console.log('API response:', response);
                        if (response) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Confirmed',
                                detail: 'You have succesfully Updated a payments',
                            });

                            setTimeout(() => {
                                this.visible = false;
                            }, 2000);
                            this.selectedpayments = [];
                            this.route.navigate(['dashboard/payments']);
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Payments Update Failed. Try again Later!',
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
                            summary: error.error[0].detail,
                            detail: 'Payments Update Failed. Try again Later!',
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
                detail: 'Payments Update Failed. Try again Later!',
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
                if (this.selectedpayments.length !== 0) {
                    this.apiservice
                        .deletePayment(this.selectedpayments)
                        .subscribe(
                            (response: any) => {
                                // Handle the API response
                                console.log('API response:', response);

                                // Refresh the paymentses after deletion
                                this.fetchpaymentses();
                            },
                            (error) => {
                                // Handle the API error
                                console.error('API error:', error);
                            }
                        );
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Confirmed',
                        detail: 'You have successfully deleted the payments',
                    });
                } else {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Notification',
                        detail: 'Please Select a payments',
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
