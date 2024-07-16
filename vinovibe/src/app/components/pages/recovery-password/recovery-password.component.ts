import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert-service.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recovery-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.css'
})
export class RecoveryPasswordComponent {
  recoveryForm: FormGroup;

  constructor(private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private alertService: AlertService,
  ) {
    {
      this.recoveryForm = this.fb.group({
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required]],
        confirmaSenha: ['', [Validators.required]],
        dtNascimento: ['', [Validators.required]]
      });
    }
  }


  navigateTo(route: string): void {
      this.router.navigate([route])
  }

  onSubmit(): void {
    if (this.recoveryForm.valid) {
      const { nome, email, senha, confirmaSenha, dtNascimento } = this.recoveryForm.value;

      if (senha !== confirmaSenha) {
        this.alertService.showError('As senhas não coincidem');
        return;
      }

      let dataNascimento = dtNascimento.split("-");
      let dataFormatada: string = `${dataNascimento[2]}/${dataNascimento[1]}/${dataNascimento[0]}`;

      const user = { nome, email, senha, confirmaSenha, dtNascimento: dataFormatada };

      this.authService.recoveryPassword(user).subscribe({
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
