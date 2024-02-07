import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BranchComponent } from './branch.component';

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: BranchComponent }]),
    ],
    exports: [RouterModule],
})
export class BranchRoutingModule {}
