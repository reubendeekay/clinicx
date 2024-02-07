import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent} from './demo/components/Login/login.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'dashboard',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './demo/components/dashboard/dashboard.module'
                                ).then((m) => m.DashboardModule),
                        },
                        {
                            path: 'services',
                            loadChildren: () =>
                                import(
                                    './demo/components/services/services.module'
                                ).then((m) => m.ServicesModule),
                        },
                        {
                            path: 'branch',
                            loadChildren: () =>
                                import(
                                    './demo/components/branch/branch.module'
                                ).then((m) => m.BranchModule),
                        },
                        {
                            path: 'patientmanagement',
                            loadChildren: () =>
                                import(
                                    './demo/components/patient/patientmanagement.module'
                                ).then((m) => m.PatientmanagementModule),
                        },
                        {
                            path: 'doctormanagement',
                            loadChildren: () =>
                                import(
                                    './demo/components/doctors/doctormanagement.module'
                                ).then((m) => m.DoctormanagementModule),
                        },
                        {
                            path: 'appointmentsmanagement',
                            loadChildren: () =>
                                import(
                                    './demo/components/appointments/appoinments.module'
                                ).then((m) => m.AppointmentsModule),
                        },
                    ],
                },
                {
                    path: 'auth',
                    loadChildren: () =>
                        import('./demo/components/auth/auth.module').then(
                            (m) => m.AuthModule
                        ),
                },
                {
                    path: '',
                    loadChildren: () =>
                        import('./demo/components/landing/landing.module').then(
                            (m) => m.LandingModule
                        ),
                },
                {
                    path: 'login',
                    loadChildren: () =>
                        import('./demo/components/Login/login.module').then(
                            (m) => m.LoginModule
                        ),
                },
                // { path: 'notfound', component: NotfoundComponent },
                { path: '**', redirectTo: '/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
