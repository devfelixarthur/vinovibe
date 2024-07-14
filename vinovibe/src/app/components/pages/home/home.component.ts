import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  wine = {
    image: 'https://images.vivino.com/thumbs/1cxXRojYQlatu0TH4AjLoA_pb_x300.png',
    name: 'Duee',
    type: 'Rosso di Verona 2021',
    location: 'Verona, Itália',
    flag: 'https://via.placeholder.com/16',
    rating: 4.3,
    ratingCount: 52,
    currentPrice: 94.90,
    originalPrice: 119.00
  };

  userRating = {
    value: 4.7,
    comment: 'Um vinho incrível para o dia a dia do entendedor. Super aprovado',
    avatar: 'P',
    name: 'Paolo',
    classifications: 823,
    date: new Date('2024-04-13')
  };
}
