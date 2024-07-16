import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private alertService: AlertService

  ) {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      confirmSenha: ['', [Validators.required]],
      dtNascimento: ['', [Validators.required]]
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { nome, email, senha, confirmSenha, dtNascimento } = this.registerForm.value;

      if (senha !== confirmSenha) {
        this.alertService.showError('As senhas não coincidem');
        return;
      }

      let dataNascimento = dtNascimento.split("-");
      let dataFormatada: string = `${dataNascimento[2]}/${dataNascimento[1]}/${dataNascimento[0]}`;

      const user = { nome, email, senha, dtNascimento: dataFormatada };

      this.authService.register(user).subscribe({
        next: (response) => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.alertService.showError(error.message);
        }
      });
    } else {
      this.alertService.showError('Por favor, preencha todos os campos obrigatórios corretamente.');
    }
  }
}
