import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../../../Services/api.service';
import { AuthService } from '../../../Services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: '../../Login/login/login.component.css',
})
export class SignUpComponent {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toast: NgToastService,
    private route: Router,
    private auth: AuthService,
    private apiservice: ApiService
  ) {}

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    phone_number: ['', [Validators.required]],
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    role: 'patient',
    date_of_birth: ['', [Validators.required]],
    marital_status: ['', [Validators.required]],
    password: ['', [Validators.required]],
    user_image:
      'https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=',
  });

  RegisterProcess() {
    if (this.registerForm.valid) {
      const payload = {
       ...this.registerForm.value
      };

      console.log(`Payload: ${JSON.stringify(payload)}`);

     this.apiservice.createUser(payload).subscribe(
       (response: any) => {
         // Check for a successful response (status code 2xx)
         if (response.status >= 200 && response.status < 300) {
           this.toast.success({
             detail: 'Successful',
             summary: 'Login Successful',
             duration: 2500,
           });

           setTimeout(() => this.route.navigate(['/dashboard']), 2000);
         } else {
           // Handle unexpected success status code
           console.error('Unexpected success status code:', response.status);
           this.toast.error({
             detail: 'Unexpected Response',
             summary: 'An unexpected response was received.',
             duration: 5000,
           });
         }
       },
       (error: any) => {
         // Handle the error response here
         console.error('Error:', error);

         // Check for specific status codes or error conditions
         if (error.status === 401) {
           // Unauthorized
           this.toast.error({
             detail: 'Unauthorized',
             summary: 'Login Failed. Please check your credentials.',
             duration: 5000,
           });
         } else if (error.status === 422) {
           // Validation error
           // Handle specific validation error cases if needed
           this.toast.error({
             detail: 'Validation Error',
             summary: 'Registration validation failed.',
             duration: 5000,
           });
         } else {
           // Handle other error conditions
           this.toast.error({
             detail: 'Registration Error',
             summary: 'An unexpected error occurred during registration.',
             duration: 5000,
           });
         }
       }
     );

    }
  }
}
