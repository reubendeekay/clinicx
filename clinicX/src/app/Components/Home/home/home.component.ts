import { Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CardComponent } from '../../Card/card/card.component';
@Component({
  selector: 'app-home',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
