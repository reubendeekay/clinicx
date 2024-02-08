import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../../../Services/api.service';
import { AuthService } from '../../../Services/auth.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
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
    users: any = [];
    mode: string = 'add';
    selecteduser: any = [];
    selectedUser: any;

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    ngOnInit() {
        this.fetchuseres();
        this.selecteduser = [];
    }

    fetchuseres() {
        this.apiservice.fetchUsers().subscribe(
            (response: any) => {
                // Handle the API response
                console.log('API response:', response);

                this.users = response;
                // this.userForm.controls['code'].setValue(this.useres.length + 1);
            },
            (error) => {
                // Handle the API error
                console.error('API error:', error);
            }
        );
    }

    // deleteSelectedUseres() {}

    onCheckboxChange(event: any, user: any) {
        console.log(user.id);

        if (event.target.checked) {
            this.selecteduser = [];

            this.selecteduser.push(user.id);
        } else {
            this.selecteduser = [];
        }
        console.log('fuck');
        console.log(this.selecteduser);
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
        // Define the custom validator function for future dates
        futureDateValidator(control: FormControl) {
            const selectedDate = new Date(control.value);
            const currentDate = new Date();
            if (selectedDate > currentDate) {
                return { futureDate: true };
            }
            return null;
        }

    userForm = this.fb.group({
        email: ['', Validators.required],
        phone_number: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        gender: ['', Validators.required],
        date_of_birth: ['', [Validators.required,this.futureDateValidator]],
        marital_status: ['', Validators.required],
        password: ['', Validators.required],
    });

    isStatusOptions: any = [{ name: 'true' }, { name: 'false' }];

    adduser() {
        this.mode = 'add';
        // const active =

        if (this.userForm.valid) {
            const payload = {
                ...this.userForm.value,
                role: 'ADMIN',
                user_image:
                    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
                marital_status: Object.values(
                    this.userForm.value.marital_status
                )[0].toUpperCase(),
                gender: Object.values(
                    this.userForm.value.gender
                )[0].toUpperCase(),
            };

            console.log('Payload: ${JSON.stringify(payload)}');

            this.apiservice.createUser(payload).subscribe(
                (response: any) => {
                    // Handle the API response
                    console.log('API response:', response);
                    if (response) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Confirmed',
                            detail: 'You have successfully created a user',
                        });

                        setTimeout(() => {
                            this.visible = false;
                        }, 2000);
                        this.route.navigate(['dashboard/users']);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'User Creation Failed. Try again Later!',
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
                        detail: 'User Creation Failed. Try again Later!',
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
                detail: 'User Creation Failed. Try again Later!',
            });
        }
    }

    editUser(user: any) {
        if (this.selecteduser.length !== 0) {
            this.visible = true;
            this.mode = 'edit';
            console.log(this.mode);
            if (user) {
                this.selectedUser = { ...user };
                this.userForm.patchValue({
                    email: user.email,
                    phone_number: user.phone_number,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    gender: user.gender,
                    marital_status: user.marital_status,
                    date_of_birth: user.date_of_birth,
                    password: user.password,
                });
            } else {
                this.selectedUser = null;
                this.userForm.reset();
            }
        } else {
            this.messageService.add({
                severity: 'info',
                summary: 'Notification',
                detail: 'Please Select a user',
            });
        }
    }

    updateUser() {
        if (this.userForm.valid) {
            const payload = {
                ...this.userForm.value,
                role: 'patient',
                user_image:
                    'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
                marital_status: Object.values(
                    this.userForm.value.marital_status
                )[0],
                gender: Object.values(this.userForm.value.gender)[0],
            };

            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice.updateUser(this.selecteduser[0], payload).subscribe(
                (response: any) => {
                    // Handle the API response
                    console.log('API response:', response);
                    if (response) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Confirmed',
                            detail: 'You have succesfully Updated a user',
                        });

                        setTimeout(() => {
                            this.visible = false;
                        }, 2000);
                        this.selecteduser = [];
                        this.route.navigate(['dashboard/users']);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'User Update Failed. Try again Later!',
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
                        detail: 'User Update Failed. Try again Later!',
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
                detail: 'User Update Failed. Try again Later!',
            });
        }
    }

    formattedRecords: any = [];
    filename: string = 'Clinicx Users.xlsx';
    exportexcel() {
        for (const user of this.users) {
            this.formattedRecords.push({
                email: user.email,
                phone_number: user.phone_number,
                first_name: user.first_name,
                last_name: user.last_name,
                gender: user.gender,
                marital_status: user.marital_status,
                date_of_birth: user.date_of_birth,
                password: user.password,
            });
        }
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
            this.formattedRecords
        );

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, this.filename);
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
                if (this.selecteduser.length !== 0) {
                    this.apiservice.deleteUser(this.selecteduser).subscribe(
                        (response: any) => {
                            // Handle the API response
                            console.log('API response:', response);

                            // Refresh the useres after deletion
                            this.fetchuseres();
                        },
                        (error) => {
                            // Handle the API error
                            console.error('API error:', error);
                        }
                    );
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Confirmed',
                        detail: 'You have successfully deleted the user',
                    });
                } else {
                    this.messageService.add({
                        severity: 'info',
                        summary: 'Notification',
                        detail: 'Please Select a user',
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