import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../../../Services/api.service';
import { AuthService } from '../../../Services/auth.service';
import { HttpClient} from '@angular/common/http';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    constructor(
        private http: HttpClient,
        private fb: FormBuilder,
        private toast: NgToastService,
        private route: Router,
        private auth: AuthService,
        private apiservice: ApiService
    ) {}

    loginForm = this.fb.group({
        emailAddress: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    });

    loader: boolean = false;

    LoginProcess() {
        if (this.loginForm.valid) {
            const payload = {
                username: this.loginForm.get('emailAddress')?.value,
                password: this.loginForm.get('password')?.value,
            };

            this.loader = true;

            console.log(`Payload: ${JSON.stringify(payload)}`);

            this.apiservice.login(payload).subscribe(
                (response: any) => {
                    // Handle the successful login response here
                    this.toast.success({
                        detail: 'Successful',
                        summary: 'Login Successful',
                        duration: 2500,
                    });

                    setTimeout(() => this.route.navigate(['/dashboard']), 2000);
                    this.auth.storeToken(response.access_token);
                    sessionStorage.setItem(
                        'login',
                        JSON.stringify(response.access_token)
                    );
                    sessionStorage.setItem(
                        'user',
                        JSON.stringify(
                            this.loginForm.get('emailAddress')?.value
                        )
                    );
            this.loader = false;

                },
                (error: any) => {
                    // Handle the error response here
                    console.error(error);
                    this.toast.error({
                        detail: 'Login Error',
                        summary: 'Login Failed. Please check your credentials.',
                        duration: 5000,
                    });
                    this.loader = false;
                }
            );
        }
    }
}