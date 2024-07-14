import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-wine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-wine.component.html',
  styleUrls: ['./card-wine.component.css']
})
export class CardWineComponent {
  @Input() wine: any;
  @Input() userRating: any;

  getRatingPercentage(rating: number): string {
    return `${(rating / 5) * 100}%`;
  }
}
