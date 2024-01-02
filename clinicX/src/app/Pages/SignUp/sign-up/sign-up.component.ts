import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [InputTextModule, ButtonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: '../../Login/login/login.component.css',
})
export class SignUpComponent {}
