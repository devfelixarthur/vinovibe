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

  getRatingWidth(rating: number): string {
    return `${(rating / 5) * 100}%`;
  }

  dateComment(date: string): string {
    const [datePart, timePart] = date.split("T");
    const [year, month, day] = datePart.split("-");
    const [hour, minute] = timePart.split(":");

    return `${day}/${month}/${year} ${hour}:${minute}`;
  }

}
