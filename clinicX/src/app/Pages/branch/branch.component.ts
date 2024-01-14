import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { TopbarComponent } from '../../Components/topbar/topbar.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [
    SidebarComponent,
    TopbarComponent,
    TableModule,
    ButtonModule,
    CommonModule,
    ChartModule,
  ],
  templateUrl: './branch.component.html',
  styleUrl: '../dashboard-home/dashboard-home.component.css',
})
export class BranchComponent {
  branchDetails: any = [
    {
      name: 'Kisumu',
      status: 'active',
    },
    {
      name: 'Kisumu',
      status: 'active',
    },
    {
      name: 'Kisumu',
      status: 'active',
    },
    {
      name: 'Kisumu',
      status: 'active',
    },
    {
      name: 'Kisumu',
      status: 'Inactive',
    },
    {
      name: 'Kisumu',
      status: 'active',
    },
    {
      name: 'Kisumu',
      status: 'Inactive',
    },
    {
      name: 'Kisumu',
      status: 'active',
    },
  ];

  class: any = 'p-datatable-sm';
}
