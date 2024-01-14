import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { TopbarComponent } from '../../Components/topbar/topbar.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    SidebarComponent,
    TopbarComponent,
    TableModule,
    ButtonModule,
    CommonModule,
    ChartModule,
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css',
})
export class DashboardHomeComponent {
  data: any;
  options: any;
  bardata: any;
  baroptions: any;
  appointments: any = [
    {
      number: '001 ',
      patientName: 'Jane Doe ',
      assignedDoctor: ' Dr.Jacob Ryan ',
      date: '12 Jan 2024',
      diseases: ' Fever',
    },
    {
      number: '001 ',
      patientName: 'Jane Doe ',
      assignedDoctor: ' Dr.Jacob Ryan ',
      date: '12 Jan 2024',
      diseases: ' Fever',
    },
    {
      number: '001 ',
      patientName: 'Jane Doe ',
      assignedDoctor: ' Dr.Jacob Ryan ',
      date: '12 Jan 2024',
      diseases: ' Fever',
    },
  ];

  doctorList: any = [
    {
      DoctorName: ' Dr.Jacob Ryan ',
      Status: 'Available',
    },
    {
      DoctorName: ' Dr.Jacob Ryan ',
      Status: 'Available',
    },
    {
      DoctorName: ' Dr.Jacob Ryan ',
      Status: 'Unavailable',
    },
    {
      DoctorName: ' Dr.Jacob Ryan ',
      Status: 'Unavailable',
    },
  ];

  // charts
  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.data = {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'sep',
        'oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          label: 'New Patients',
          fill: false,
          borderColor: '#E3A3E0',
          yAxisID: 'y',
          tension: 0.4,
          data: [65, 59, 80, 81, 56, 55, 10, 19, 86, 27, 90, 50],
        },
        {
          label: 'Old Patients',
          fill: false,
          borderColor: '#D8D2FC',
          yAxisID: 'y1',
          tension: 0.4,
          data: [28, 48, 40, 19, 86, 27, 90, 19, 86, 27, 90, 50],
        },
      ],
    };

    this.options = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 1.2,
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: '#271E4A',
          },
        },
      },
      scales: {
        x: {
          display: true,

          ticks: {
            color: '#271E4A',
            font: {
              family: 'Kanit',
            },
          },
          grid: {
            display: false,
            color: surfaceBorder,
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y1: {
          type: 'linear',
          display: false,
          position: 'right',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder,
          },
        },
      },
    };

    // bar chart
    this.bardata = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'bar',
          label: 'Dataset 1',
          backgroundColor: '#E3A3E0',
          data: [50, 25, 12, 48, 90, 76, 42],
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: '#A1D7F9',
          data: [21, 84, 24, 75, 37, 65, 34],
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: '#CBD6F3',
          data: [41, 52, 24, 74, 23, 21, 32],
        },
      ],
    };

    this.baroptions = {
      maintainAspectRatio: false,
      aspectRatio: 1.2,
      plugins: {
        tooltip: {
          mode: 'index',
          intersect: false,
        },
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };
  }
}
