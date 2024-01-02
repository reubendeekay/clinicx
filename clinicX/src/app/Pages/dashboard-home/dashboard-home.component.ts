import { Component } from '@angular/core';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent {

}
