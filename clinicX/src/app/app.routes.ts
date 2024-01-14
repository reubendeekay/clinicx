import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Home/home/home.component';
import { LoginComponent } from './Pages/Login/login/login.component';
import { SignUpComponent } from './Pages/SignUp/sign-up/sign-up.component';
import { DashboardHomeComponent } from './Pages/dashboard-home/dashboard-home.component';
import { BranchComponent } from './Pages/branch/branch.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'dashboard', component: DashboardHomeComponent },
  { path: 'branchmanagement', component: BranchComponent },
];
