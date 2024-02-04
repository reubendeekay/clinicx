import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { TopbarComponent } from '../../Components/topbar/topbar.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../../Services/api.service';
import { AuthService } from '../../Services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [
    SidebarComponent,
    TopbarComponent,
    TableModule,
    ButtonModule,
    CommonModule,
    ChartModule,
  ],
  templateUrl: './branch.component.html',
  styleUrl: '../dashboard-home/dashboard-home.component.css',
})
export class BranchComponent {
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private toast: NgToastService,
    private route: Router,
    private auth: AuthService,
    private apiservice: ApiService
  ) {}
  branches: any;
  selectedbranch: any = [];

  ngOnInit() {
    this.fetchbranches();
  }

  fetchbranches() {
    this.apiservice.fetchBranches().subscribe(
      (response: any) => {
        // Handle the API response
        console.log('API response:', response);

        this.branches = response;
        // this.branchForm.controls['code'].setValue(this.branches.length + 1);
      },
      (error) => {
        // Handle the API error
        console.error('API error:', error);
      }
    );
  }

  deleteSelectedBranches() {
    // Assuming selectedbranch is an array of branch IDs to be deleted
    this.apiservice.deleteBranch(this.selectedbranch).subscribe(
      (response: any) => {
        // Handle the API response
        console.log('API response:', response);

        // Refresh the branches after deletion
        this.fetchbranches();
      },
      (error) => {
        // Handle the API error
        console.error('API error:', error);
      }
    );
  }

  class: any = 'p-datatable-sm';

  onCheckboxChange(event: any, branch: any) {
    console.log(branch.id);

    if (event.target.checked) {
      this.selectedbranch.push(branch.id);
    } else {
      // If the checkbox is unchecked, remove the branch ID from selectedBranch if it exists
      this.selectedbranch = this.selectedbranch.filter(
        (selected: any) => selected !== branch.id
      );
    }
    console.log(this.selectedbranch);
  }
}
