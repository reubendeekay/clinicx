import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  @Input() title: string | undefined;
}
