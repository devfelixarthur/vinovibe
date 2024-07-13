import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    if (route === 'home') {
      const loginToken = sessionStorage.getItem('login_token');
      if (loginToken) {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['login']);
      }
    } else {
      this.router.navigate([route]);
    }
  }

}
