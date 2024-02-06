import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { TopbarComponent } from '../../Components/topbar/topbar.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ApiService } from '../../Services/api.service';
import { AuthService } from '../../Services/auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';

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
    DialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextModule,
  ],
  templateUrl: './branch.component.html',
  styleUrls: [
    '../dashboard-home/dashboard-home.component.css',
    './branch.component.css',
  ],
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
  mode: string = 'add';
  selectedbranch: any = [];
  selectedBranch: any;

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

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

    if (this.selectedbranch.length !== 0) {
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
    } else {
      this.toast.info({
        detail: 'Info',
        summary: 'Select Branch',
        duration: 5000,
      });
    }
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

  branchForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    address: ['', Validators.required],
    phone_number: [
      '',
      [
        Validators.required,
        // Validators.pattern(
        //   /^(\+254\w?7\d{8}|\+2541\d{8}|\+25420\d{7}|\+25430\d{7}|\+25440\d{7}|\+25450\d{7}|\+25460\d{7}|\+25470\d{7}|\+25480\d{7}|\+25490\d{7})$/
        // ),
      ],
    ],
    longitude: ['', [Validators.required]],
    latitude: ['', [Validators.required]],
  });

  addbranch() {
    this.mode = 'add';

    if (this.branchForm.valid) {
      const payload = {
        id: this.selectedbranch[0],
        ...this.branchForm.value,
      };

      console.log(`Payload: ${JSON.stringify(payload)}`);

      this.apiservice.createBranch(payload).subscribe(
        (response: any) => {
          // Handle the API response
          console.log('API response:', response);
          if (response.success) {
            this.toast.success({
              detail: 'Successful',
              summary: 'Branch created Successful',
              duration: 2500,
            });

            setTimeout(() => {
              this.visible = false;
            }, 2000);
            this.route.navigate(['/branchmanagement']);
          } else {
            this.toast.error({
              detail: 'Error',
              summary: 'Branch Failed. Please try again later.',
              duration: 5000,
            });

            setTimeout(() => {
              this.visible = false;
            }, 2000);
          }
        },
        (error) => {
          // Handle the API error
          console.error('API error:', error);
          this.toast.error({
            detail: 'Error',
            summary: 'Branch Failed. Please try again later.',
            duration: 5000,
          });
          setTimeout(() => {
            this.visible = false;
          }, 2000);
        }
      );
    } else {
      this.toast.error({
        detail: 'Error',
        summary: 'Branch Creation Failed. Please check form values.',
        duration: 5000,
      });
    }
  }

  editBranch(branch: any) {
    if (this.selectedbranch.length !== 0) {
      this.visible = true;
      this.mode = 'edit';
      console.log(this.mode);
      if (branch) {
        this.selectedBranch = { ...branch };
        this.branchForm.patchValue({
          name: branch.name,
          description: branch.description,
          address: branch.address,
          phone_number: branch.phone_number,
          longitude: branch.longitude,
          latitude: branch.latitude,
        });
      } else {
        this.selectedBranch = null;
        this.branchForm.reset();
      }
    } else {
      this.toast.info({
        detail: 'Info',
        summary: 'Select Branch',
        duration: 5000,
      });
    }
  }

  updateBranch() {
    if (this.branchForm.valid) {
      const payload = {
        ...this.branchForm.value,
      };

      console.log(`Payload: ${JSON.stringify(payload)}`);

      this.apiservice.updateBranch(this.selectedbranch, payload).subscribe(
        (response: any) => {
          // Handle the API response
          console.log('API response:', response);
          if (response.success) {
            this.toast.success({
              detail: 'Successful',
              summary: 'Branch Updated Successful',
              duration: 2500,
            });

            setTimeout(() => {
              this.visible = false;
            }, 2000);
            this.route.navigate(['/branchmanagement']);
          } else {
            this.toast.error({
              detail: 'Error',
              summary: 'Branch Update Failed. Please try again later.',
              duration: 5000,
            });

            setTimeout(() => {
              this.visible = false;
            }, 2000);
          }
        },
        (error) => {
          // Handle the API error
          console.error('API error:', error);
          this.toast.error({
            detail: 'Error',
            summary: 'Branch Failed. Please try again later.',
            duration: 5000,
          });
          setTimeout(() => {
            this.visible = false;
          }, 2000);
        }
      );
    } else {
      this.toast.error({
        detail: 'Error',
        summary: 'Branch Failed. Please check form values.',
        duration: 5000,
      });
    }
  }
}
