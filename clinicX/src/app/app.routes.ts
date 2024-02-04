import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Home/home/home.component';
import { LoginComponent } from './Pages/Login/login/login.component';
import { SignUpComponent } from './Pages/SignUp/sign-up/sign-up.component';
import { DashboardHomeComponent } from './Pages/dashboard-home/dashboard-home.component';
import { BranchComponent } from './Pages/branch/branch.component';
import { PatientlistComponent } from './Pages/patientlist/patientlist.component';
import { PatientFormComponent } from './Pages/patient-form/patient-form.component';
import { PatientProfileComponent } from './Pages/patient-profile/patient-profile.component';
import { BookingComponent } from './Pages/booking/booking.component';
import { authGuard } from '../app/Guards/auth.guard.service';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  {
    path: 'dashboard',
    component: DashboardHomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'branchmanagement',
    component: BranchComponent,
    canActivate: [authGuard],
  },
  {
    path: 'patientmanagement',
    component: PatientlistComponent,
    canActivate: [authGuard],
  },
  {
    path: 'addPatient',
    component: PatientFormComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: PatientProfileComponent,
    canActivate: [authGuard],
  },
  { path: 'booking', component: BookingComponent },
  // {path: '**', component: '<h1>Page not found</h1>'},
];
