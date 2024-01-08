import { Component } from '@angular/core';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { TopbarComponent } from '../../Components/topbar/topbar.component';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [SidebarComponent,TopbarComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent {

}
