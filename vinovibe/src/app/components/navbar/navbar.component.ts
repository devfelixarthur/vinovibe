import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NavbarComponent {
  adegaDropdownVisible = false;
  paisDropdownVisible = false;
  uvaDropdownVisible = false;

  toggleDropdown(dropdown: string) {
    if (dropdown === 'adega') {
      this.adegaDropdownVisible = !this.adegaDropdownVisible;
      this.paisDropdownVisible = false;
      this.uvaDropdownVisible = false;
    } else if (dropdown === 'pais') {
      this.paisDropdownVisible = !this.paisDropdownVisible;
      this.adegaDropdownVisible = false;
      this.uvaDropdownVisible = false;
    } else if (dropdown === 'uva') {
      this.uvaDropdownVisible = !this.uvaDropdownVisible;
      this.adegaDropdownVisible = false;
      this.paisDropdownVisible = false;
    }
  }

}
