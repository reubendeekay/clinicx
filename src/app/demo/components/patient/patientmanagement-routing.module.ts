import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PatientmanagementComponent } from './patientmanagement.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: PatientmanagementComponent }]),
    ],
    exports: [RouterModule],
})
export class PatientmanagementRoutingModule {}