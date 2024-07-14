import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.css'
})
export class RecoveryPasswordComponent {

  constructor(private router: Router) {}


  navigateTo(route: string): void {
      this.router.navigate([route])
  }

}
