import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardWineComponent } from '../../card-wine/card-wine.component';
import { WineService } from '../../../services/wine-service.service';
import { AlertService } from '../../../services/alert-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardWineComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  wines: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  loading: boolean = false;

  constructor(private wineService: WineService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadWines();
  }

  loadWines() {
    this.loading = true;
    let itemInicio = (this.currentPage - 1) * this.itemsPerPage;
    let itemFim = itemInicio + this.itemsPerPage;

    if (itemInicio <= 0) {
      itemInicio = 1;
    }

    this.wineService.getWines(itemInicio, itemFim).subscribe(data => {
      this.wines = data.wines;
      this.totalPages = Math.ceil(data.totalWine / this.itemsPerPage);
      this.loading = false;
    }, error => {
      this.alertService.showError('Erro ao carregar vinhos.');
      this.loading = false;
    });
  }

  updateItemsPerPage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = parseInt(selectElement.value, 10);
    this.currentPage = 1;
    this.loadWines();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadWines();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadWines();
    }
  }

  toggleActive(event: any) {
    const button = event.target;
    button.classList.toggle('active');
  }
}
