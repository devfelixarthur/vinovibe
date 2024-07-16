import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private alertService: AlertService

  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          if (response.titulo === 'Sucesso') {
            this.router.navigate(['/home']);
          } else {
            this.alertService.showError('Usuário ou senha inválidos.');
          }
        },
        error: (error) => {
          this.alertService.showError('Usuário ou senha inválidos.');
        }
      });
    } else {
      this.alertService.showWarning('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }


}
