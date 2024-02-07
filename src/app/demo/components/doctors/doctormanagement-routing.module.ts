import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DoctormanagementComponent } from './doctormanagement.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: DoctormanagementComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class DoctormanagementRoutingModule {}
