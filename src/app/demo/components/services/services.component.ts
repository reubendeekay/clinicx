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
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.css'],
})
export class ServicesComponent {
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
    services: any = [];
    mode: string = 'add';
    selectedservice: any = [];
    selectedService: any;

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    ngOnInit() {
        this.fetchservicees();
        this.selectedservice = [];
    }

    fetchservicees() {
        this.apiservice.fetchServices().subscribe(
            (response: any) => {
                // Handle the API response
                console.log('API response:', response);

                this.services = response;
                // this.serviceForm.controls['code'].setValue(this.servicees.length + 1);
            },
            (error) => {
                // Handle the API error
                console.error('API error:', error);
            }
        );
    }

    // deleteSelectedServicees() {}

    onCheckboxChange(event: any, service: any) {
        console.log(service.id);

        if (event.target.checked) {
            this.selectedservice = [];

            this.selectedservice.push(service.id);
        } else {
            this.selectedservice = [];
        }
        console.log(this.selectedservice);
    }

    serviceForm = this.fb.group({
        name: ['', Validators.required],
        price: ['', [Validators.pattern('^[0-9]*$'), Validators.required]],
        isActive: ['', Validators.required],
    });

    isStatusOptions: any = [{ name: 'true' }, { name: 'false' }];

    addservice() {
        this.mode = 'add';
        // const active =

        if (this.serviceForm.valid) {
            const payload = {
                ...this.serviceForm.value,
                is_active:
                    Object.values(this.serviceForm.value.isActive)[0] === 'true'
                        ? true
                        : false,
            };

            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice.createService(payload).subscribe(
                (response: any) => {
                    // Handle the API response
                    console.log('API response:', response);
                    if (response) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Confirmed',
                            detail: 'You have successfully created a service',
                        });

                        setTimeout(() => {
                            this.visible = false;
                        }, 2000);
                        this.route.navigate(['dashboard/services']);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Service Creation Failed. Try again Later!',
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
                        detail: 'Service Creation Failed. Try again Later!',
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
                detail: 'Service Creation Failed. Try again Later!',
            });
        }
    }

    formattedRecords: any = [];
    filename: string = `Clinicx Service.xlsx`;
    exportexcel() {
        for (const service of this.services) {
            this.formattedRecords.push({
                name: service.name,
                price: service.price,
                isActive: service.is_active,
            });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
            this.formattedRecords
        );

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, this.filename);
    }

    editService(service: any) {
        if (this.selectedservice.length !== 0) {
            this.visible = true;
            this.mode = 'edit';
            console.log(this.mode);
            if (service) {
                this.selectedService = { ...service };
                this.serviceForm.patchValue({
                    name: service.name,
                    price: service.price,
                    isActive: service.is_active,
                });
            } else {
                this.selectedService = null;
                this.serviceForm.reset();
            }
        } else {
            this.messageService.add({
                severity: 'info',
                summary: 'Notification',
                detail: 'Please Select a service',
            });
        }
    }
    updateService() {
        if (this.serviceForm.valid) {
            const payload = {
                ...this.serviceForm.value,
                is_active:
                    Object.values(this.serviceForm.value.isActive)[0] === 'true'
                        ? true
                        : false,
            };

            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice
                .updateService(this.selectedservice, payload)
                .subscribe(
                    (response: any) => {
                        // Handle the API response
                        console.log('API response:', response);
                        if (response) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Confirmed',
                                detail: 'You have succesfully Updated a service',
                            });

                            setTimeout(() => {
                                this.visible = false;
                            }, 2000);
                            this.selectedservice = [];
                            this.route.navigate(['dashboard/services']);
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error',
                                detail: 'Service Update Failed. Try again Later!',
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
                            detail: 'Service Update Failed. Try again Later!',
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
                detail: 'Service Update Failed. Try again Later!',
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
                if (this.selectedservice.length !== 0) {
                    this.apiservice
                        .deleteService(this.selectedservice)
                        .subscribe(
                            (response: any) => {
                                // Handle the API response
                                console.log('API response:', response);

                                // Refresh the servicees after deletion
                                this.fetchservicees();
                            },
                            (error) => {
                                // Handle the API error
                                console.error('API error:', error);
                            }
                        );
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Confirmed',
                        detail: 'You have successfully deleted the service',
                    });
                } else {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Notification',
                        detail: 'Please Select a service',
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
