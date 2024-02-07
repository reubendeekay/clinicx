import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { TopbarComponent } from '../../Components/topbar/topbar.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-doctormanagement',
  standalone: true,
  imports: [
    SidebarComponent,
    TopbarComponent,
    TableModule,
    CommonModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
  ],
  templateUrl: './doctormanagement.component.html',
  styleUrl: './doctormanagement.component.css',
})
export class DoctormanagementComponent {}
