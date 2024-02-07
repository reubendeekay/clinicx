import { Component ,ElementRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ButtonModule, SidebarModule, NgFor, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  sidebarVisible1: boolean = false;
  model: any[] = [];

  constructor(private elementRef: ElementRef) {}

  sidebarLogic() {
    this.sidebarVisible1 = true;
  }
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
            label: 'View a user',
            icon: 'pi pi-fw pi-eye',
            routerLink: ['/dashboard/users'],
          },
        ],
      },
      {
        label: 'Clients',
        items: [
          {
            label: 'View Clients',
            icon: 'pi pi-fw pi-eye',
            routerLink: ['/dashboard/clients'],
          },
        ],
      },
      {
        label: 'Services',
        items: [
          {
            label: 'All Services',
            icon: 'pi pi-fw pi-eye',
            routerLink: ['/dashboard/services'],
          },
          {
            label: 'Service Settings',
            icon: 'pi pi-fw pi-cog',
            routerLink: ['/dashboard/serviceSettings'],
          },
        ],
      },
      {
        label: 'Paybill',
        items: [
          {
            label: 'View Paybill',
            icon: 'pi pi-fw pi-eye',
            routerLink: ['/dashboard/paybill'],
          },
        ],
      },
      // {
      //   label: "Payments",
      //   items: [
      //     {
      //       label: "View Payments",
      //       icon: "pi pi-fw pi-eye",
      //       routerLink: ["/dashboard/payments"],
      //     },
      //   ],
      // },
      //     {
      //       label: "Employee",
      //       items: [
      //         {
      //           label: "View an employee",
      //           icon: "pi pi-fw pi-eye",
      //           routerLink: ["/dashboard/employees"],
      //         },
      //       ],
      //     },
      //     {
      //       label: "Members",
      //       items: [
      //         {
      //           label: "View an Member",
      //           icon: "pi pi-fw pi-eye",
      //           routerLink: ["/dashboard/members"],
      //         },
      //       ],
      //     },
      //     {
      //       label: "Accounts",
      //       items: [
      //         {
      //           label: "View an Account",
      //           icon: "pi pi-fw pi-eye",
      //           routerLink: ["/dashboard/accounts"],
      //         },
      //       ],
      //     },
      //     {
      //       label: "Get Started",
      //       items: [
      //         {
      //           label: "Documentation",
      //           icon: "pi pi-fw pi-question",
      //           routerLink: ["/documentation"],
      //         },
      //       ],
      //     },
    ];
  }
}

// <div
//   class="p-component-overlay p-sidebar-mask p-component-overlay-enter ng-tns-c2903228607-1"
//   style="z-index: 1101;"
// ></div>;
