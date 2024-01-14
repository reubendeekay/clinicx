import { Component } from '@angular/core';
import { TopbarComponent } from '../../Components/topbar/topbar.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-patient-profile',
  standalone: true,
  imports: [TopbarComponent, ButtonModule, TableModule],
  templateUrl: './patient-profile.component.html',
  styleUrl: '../dashboard-home/dashboard-home.component.css',
})
export class PatientProfileComponent {
  history: any = [
    {
      date: '2022-01-01',
      doctor: 'Dr. Smith',
      Treatment: 'Checkup',
      charges: 50,
    },
    {
      date: '2022-01-02',
      doctor: 'Dr. Johnson',
      Treatment: 'X-ray',
      charges: 80,
    },
    {
      date: '2022-01-03',
      doctor: 'Dr. Brown',
      Treatment: 'Dental Cleaning',
      charges: 60,
    },
    {
      date: '2022-01-04',
      doctor: 'Dr. White',
      Treatment: 'Physical Therapy',
      charges: 90,
    },
    {
      date: '2022-01-05',
      doctor: 'Dr. Davis',
      Treatment: 'Blood Test',
      charges: 70,
    },
  ];
}
