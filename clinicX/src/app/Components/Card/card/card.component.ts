import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() title: string | undefined;
  @Input() color: string | undefined;
  @Input() img: string | undefined;
  @Input() tag: string | undefined;
  @Input() specialization: string | undefined;
  @Input() city: string | undefined;
  @Input() reviews: string | undefined;
  @Input() rating: string | undefined;
  @Input() description: string | undefined;

  imagepath: string | undefined;

  ngOnInit(): void {
    this.imagepath = `../../../../assets/Images/${this.img}.png`;
  }

  opacity = 0.16;

  getBackgroundColorWithOpacity(): string {
    if (this.color) {
      // Convert the hex color to RGB and apply opacity
      const rgbColor = this.hexToRgb(this.color);
      return `rgba(${rgbColor}, ${this.opacity})`;
    }
    return '';
  }

  private hexToRgb(hex: string): string {
    // Convert hex color to RGB format
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
  }
}
