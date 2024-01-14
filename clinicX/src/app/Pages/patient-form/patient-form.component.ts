import { Component } from '@angular/core';
import { TopbarComponent } from '../../Components/topbar/topbar.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
@Component({
  selector: 'app-patient-form',
  standalone: true,
  imports: [TopbarComponent , ButtonModule, InputTextModule, FileUploadModule],
  templateUrl: './patient-form.component.html',
  styleUrl: '../dashboard-home/dashboard-home.component.css',
})
export class PatientFormComponent {}
