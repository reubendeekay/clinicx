import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService, public messageService: MessageService, public router: Router) {}

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/dashboard'],
                    },
                ],
            },
            {
                label: 'Users',
                items: [
                    {
                        label: 'Users',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/dashboard/usersmanagement'],
                    },
                    {
                        label: 'Doctor Management',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['/dashboard/doctormanagement'],
                    },
                    {
                        label: 'Patient Management',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['/dashboard/patientmanagement'],
                    },
                ],
            },
            {
                label: 'Branch',
                items: [
                    {
                        label: 'Service Management',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: ['/dashboard/services'],
                    },
                    {
                        label: 'Branch Management',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: ['/dashboard/branch'],
                    },
                ],
            },
            {
                label: 'Appointments',
                items: [
                    {
                        label: 'Appointment Management',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: ['/dashboard/appointmentsmanagement'],
                    },
                    {
                        label: 'Payments Management',
                        icon: 'pi pi-fw pi-eye',
                        routerLink: ['/dashboard/paymentsmanagement'],
                    },
                ],
            },
            {
                label: 'Logout',
                items: [
                    {
                        label: 'Logout',
                        icon: 'pi pi-fw pi-sign-out',
                        routerLink: ['/'],
                    },
                ],
            },
        ];
    }

    
}
