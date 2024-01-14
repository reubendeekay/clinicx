import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Home/home/home.component';
import { LoginComponent } from './Pages/Login/login/login.component';
import { SignUpComponent } from './Pages/SignUp/sign-up/sign-up.component';
import { DashboardHomeComponent } from './Pages/dashboard-home/dashboard-home.component';
import { BranchComponent } from './Pages/branch/branch.component';
import { PatientlistComponent } from './Pages/patientlist/patientlist.component';
import { PatientFormComponent } from './Pages/patient-form/patient-form.component';
import { PatientProfileComponent } from './Pages/patient-profile/patient-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'dashboard', component: DashboardHomeComponent },
  { path: 'branchmanagement', component: BranchComponent },
  { path: 'patientmanagement', component: PatientlistComponent },
  { path: 'addPatient', component: PatientFormComponent },
  { path: 'profile', component: PatientProfileComponent },
];
