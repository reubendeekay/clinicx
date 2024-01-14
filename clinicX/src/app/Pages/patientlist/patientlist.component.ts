import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { TopbarComponent } from '../../Components/topbar/topbar.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-patientlist',
  standalone: true,
  imports: [
    SidebarComponent,
    TopbarComponent,
    TableModule,
    CommonModule,
    InputTextModule,
    ButtonModule, DropdownModule
  ],
  templateUrl: './patientlist.component.html',
  styleUrl: '../dashboard-home/dashboard-home.component.css',
})
export class PatientlistComponent {
  class: any = 'p-datatable-lg';
  patientDetails: any = [
    {
      patientName: 'John Doe',
      branch: 'Kisumu',
      branchDetails: 'Details1',
      services: 'OBYGN',
      reportStatus: 'Cancelled',
      time: '1 minute ago',
    },
    {
      patientName: 'Jane Smith',
      branch: 'Nairobi',
      branchDetails: 'Details2',
      services: 'Dentist',
      reportStatus: 'Pending',
      time: '5 minutes ago',
    },
    {
      patientName: 'Alice Johnson',
      branch: 'Mombasa',
      branchDetails: 'Details3',
      services: 'Doctor',
      reportStatus: 'Complete',
      time: '10 minutes ago',
    },
    {
      patientName: 'Bob Anderson',
      branch: 'Kisumu',
      branchDetails: 'Details4',
      services: 'OBYGN',
      reportStatus: 'Cancelled',
      time: '15 minutes ago',
    },
    {
      patientName: 'Eva White',
      branch: 'Nairobi',
      branchDetails: 'Details5',
      services: 'Dentist',
      reportStatus: 'Complete',
      time: '20 minutes ago',
    },
    {
      patientName: 'Michael Brown',
      branch: 'Mombasa',
      branchDetails: 'Details6',
      services: 'Doctor',
      reportStatus: 'Pending',
      time: '30 minutes ago',
    },
    {
      patientName: 'Sophia Lee',
      branch: 'Kisumu',
      branchDetails: 'Details7',
      services: 'OBYGN',
      reportStatus: 'Complete',
      time: '45 minutes ago',
    },
    {
      patientName: 'David Clark',
      branch: 'Nairobi',
      branchDetails: 'Details8',
      services: 'Dentist',
      reportStatus: 'Pending',
      time: '1 hour ago',
    },
    {
      patientName: 'Olivia Taylor',
      branch: 'Mombasa',
      branchDetails: 'Details9',
      services: 'Doctor',
      reportStatus: 'Complete',
      time: '2 hours ago',
    },
    {
      patientName: 'Liam Evans',
      branch: 'Kisumu',
      branchDetails: 'Details10',
      services: 'OBYGN',
      reportStatus: 'Pending',
      time: '4 hours ago',
    },
    {
      patientName: 'Emma Wilson',
      branch: 'Nairobi',
      branchDetails: 'Details11',
      services: 'Dentist',
      reportStatus: 'Complete',
      time: '6 hours ago',
    },
    // Add more records as needed
  ];
}
