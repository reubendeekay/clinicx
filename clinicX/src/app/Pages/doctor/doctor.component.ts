import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { TopbarComponent } from '../../Components/topbar/topbar.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../../Services/api.service';
import { AuthService } from '../../Services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-doctor',
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
  templateUrl: './doctor.component.html',
  styleUrl: '../dashboard-home/dashboard-home.component.css',
})
export class DoctorComponent {
  class: any = 'p-datatable-lg';
  doctorDetails: any = [
    {
      doctorName: 'John Doe',
      doctor: 'Kisumu',
      doctorDetails: 'Details1',
      services: 'OBYGN',
      reportStatus: 'Cancelled',
      time: '1 minute ago',
    },
    {
      doctoeName: 'Jane Smith',
      doctor: 'Nairobi',
      doctorDetails: 'Details2',
      services: 'Dentist',
      reportStatus: 'Pending',
      time: '5 minutes ago',
    },
    {
      doctorName: 'Alice Johnson',
      doctor: 'Mombasa',
      doctorDetails: 'Details3',
      services: 'Doctor',
      reportStatus: 'Complete',
      time: '10 minutes ago',
    },
    {
      doctorName: 'Bob Anderson',
      doctor: 'Kisumu',
      doctorDetails: 'Details4',
      services: 'OBYGN',
      reportStatus: 'Cancelled',
      time: '15 minutes ago',
    },
    {
      doctorName: 'Eva White',
      doctor: 'Nairobi',
      doctorDetails: 'Details5',
      services: 'Dentist',
      reportStatus: 'Complete',
      time: '20 minutes ago',
    },
    {
      doctorName: 'Michael Brown',
      doctor: 'Mombasa',
      doctorDetails: 'Details6',
      services: 'Doctor',
      reportStatus: 'Pending',
      time: '30 minutes ago',
    },
    {
      doctorName: 'Sophia Lee',
      doctor: 'Kisumu',
      doctorDetails: 'Details7',
      services: 'OBYGN',
      reportStatus: 'Complete',
      time: '45 minutes ago',
    },
    {
      doctorName: 'David Clark',
      doctor: 'Nairobi',
      doctorDetails: 'Details8',
      services: 'Dentist',
      reportStatus: 'Pending',
      time: '1 hour ago',
    },
    {
      doctorName: 'Olivia Taylor',
      doctor: 'Mombasa',
      doctorDetails: 'Details9',
      services: 'Doctor',
      reportStatus: 'Complete',
      time: '2 hours ago',
    },
    {
      doctorName: 'Liam Evans',
      doctor: 'Kisumu',
      doctorDetails: 'Details10',
      services: 'OBYGN',
      reportStatus: 'Pending',
      time: '4 hours ago',
    },
    {
      doctorName: 'Emma Wilson',
      doctor: 'Nairobi',
      doctorDetails: 'Details11',
      services: 'Dentist',
      reportStatus: 'Complete',
      time: '6 hours ago',
    },
  ];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toast: NgToastService,
    private route: Router,
    private auth: AuthService,
    private apiservice: ApiService
  ) { }

  doctors: any = [];
  selectedDoctor: any;
  selecteddoctor: any;
  fetchDoctors() {
    this.apiservice.fetchDoctors().subscribe(
      (response: any) => {
        // Handle the API response
        console.log('API response:', response);

        this.doctors = response;
        // this.doctorForm.controls['code'].setValue(this.doctores.length + 1);
      },
      (error) => {
        // Handle the API error
        console.error('API error:', error);
      }
    );
  }

  ngOnInit() {
    this.fetchDoctors();
  }

  deleteDoctor() {
    if (this.selecteddoctor.length !== 0) {
      this.apiservice.deleteDoctors(this.selecteddoctor).subscribe(
        (response: any) => {
          // Handle the API response
          console.log('API response:', response);
          // Refresh the doctores after deletion
          this.fetchDoctors();
        },
        (error) => {
          // Handle the API error
          console.error('API error:', error);
        }
      );
    } else {
      this.toast.info({
        detail: 'Info',
        summary: 'Select Doctor',
        duration: 5000,
      });
    }
  }

  onCheckboxChange(event: any, doctor: any) {
    console.log(doctor.id);

    if (event.target.checked) {
      this.selecteddoctor.push(doctor.id);
    } else {
      // If the checkbox is unchecked, remove the doctor ID from selectedDoctor if it exists
      this.selecteddoctor = this.selecteddoctor.filter(
        (selected: any) => selected !== doctor.id
      );
    }
    console.log(this.selecteddoctor);
  }

  doctorForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    address: ['', Validators.required],
    phone_number: [
      '',
      [
        Validators.required,
        // Validators.pattern(
        //   /^(\+254\w?7\d{8}|\+2541\d{8}|\+25420\d{7}|\+25430\d{7}|\+25440\d{7}|\+25450\d{7}|\+25460\d{7}|\+25470\d{7}|\+25480\d{7}|\+25490\d{7})$/
        // ),
      ],
    ],
    longitude: ['', [Validators.required]],
    latitude: ['', [Validators.required]],
  });

  mode: String = 'add';
  visible: boolean = true;

  adddoctor() {
    this.mode = 'add';

    if (this.doctorForm.valid) {
      const payload = {
        id: this.selecteddoctor[0],
        ...this.doctorForm.value,
      };

      console.log(`Payload: ${JSON.stringify(payload)}`);

      this.apiservice.createDoctors(payload).subscribe(
        (response: any) => {
          // Handle the API response
          console.log('API response:', response);
          if (response.success) {
            this.toast.success({
              detail: 'Successful',
              summary: 'Doctor created Successful',
              duration: 2500,
            });

            setTimeout(() => {
              this.visible = false;
            }, 2000);
            this.route.navigate(['/doctormanagement']);
          } else {
            this.toast.error({
              detail: 'Error',
              summary: 'Doctor Failed. Please try again later.',
              duration: 5000,
            });

            setTimeout(() => {
              this.visible = false;
            }, 2000);
          }
        },
        (error) => {
          // Handle the API error
          console.error('API error:', error);
          this.toast.error({
            detail: 'Error',
            summary: 'Doctor Failed. Please try again later.',
            duration: 5000,
          });
          setTimeout(() => {
            this.visible = false;
          }, 2000);
        }
      );
    } else {
      this.toast.error({
        detail: 'Error',
        summary: 'Doctor Creation Failed. Please check form values.',
        duration: 5000,
      });
    }
  }
  
  

  editDoctor(doctor: any) {
    if (this.selecteddoctor.length !== 0) {
      this.visible = true;
      this.mode = 'edit';
      console.log(this.mode);
      if (doctor) {
        this.selectedDoctor = { ...doctor };
        this.doctorForm.patchValue({
          name: doctor.name,
          description: doctor.description,
          address: doctor.address,
          phone_number: doctor.phone_number,
          longitude: doctor.longitude,
          latitude: doctor.latitude,
        });
      } else {
        this.selectedDoctor = null;
        this.doctorForm.reset();
      }
    } else {
      this.toast.info({
        detail: 'Info',
        summary: 'Select Doctor',
        duration: 5000,
      });
    }
  }

  updateDoctor() {
    if (this.doctorForm.valid) {
      const payload = {
        ...this.doctorForm.value,
      };

      console.log(`Payload: ${JSON.stringify(payload)}`);

      this.apiservice.updateDoctors(this.selecteddoctor, payload).subscribe(
        (response: any) => {
          // Handle the API response
          console.log('API response:', response);
          if (response.success) {
            this.toast.success({
              detail: 'Successful',
              summary: 'Doctor Updated Successful',
              duration: 2500,
            });

            setTimeout(() => {
              this.visible = false;
            }, 2000);
            this.route.navigate(['/doctormanagement']);
          } else {
            this.toast.error({
              detail: 'Error',
              summary: 'Doctor Update Failed. Please try again later.',
              duration: 5000,
            });

            setTimeout(() => {
              this.visible = false;
            }, 2000);
          }
        },
        (error) => {
          // Handle the API error
          console.error('API error:', error);
          this.toast.error({
            detail: 'Error',
            summary: 'Doctor Failed. Please try again later.',
            duration: 5000,
          });
          setTimeout(() => {
            this.visible = false;
          }, 2000);
        }
      );
    } else {
      this.toast.error({
        detail: 'Error',
        summary: 'Doctor Failed. Please check form values.',
        duration: 5000,
      });
    }

  }
}




