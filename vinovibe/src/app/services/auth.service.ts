import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.staging';
import { AlertService } from './alert-service.service';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private sessionCheckInterval: any;
  private encryptionKey = environment.encryptionKey;

  constructor(
    private http: HttpClient,
    private alertService: AlertService
  ) {
    window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
  }

  login(email: string, password: string): Observable<any> {
    console.log('Login iniciado');
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          console.log('Resposta recebida do servidor', response);
          if (response.titulo === 'Sucesso') {
            const encryptedEmail = this.encrypt(email);
            const encryptedPassword = this.encrypt(password);

            console.log('Armazenando no localStorage');
            localStorage.setItem('token_api', response.mensagem);
            localStorage.setItem('login_time', new Date().toISOString());
            localStorage.setItem('encrypted_email', encryptedEmail);
            localStorage.setItem('encrypted_password', encryptedPassword);

            this.startSessionCheck();
            return response;
          } else {
            console.error('Erro no login', response.mensagem);
            throw new Error(response.mensagem || 'Falha no login');
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro no login', error);
          return throwError(() => new Error("Usuário ou Senha inválidos"));
        })
      );
  }

  register(user: { nome: string, email: string, senha: string, dtNascimento: string }): Observable<any> {
    console.log('Registro iniciado');
    return this.http.post<any>(`${this.apiUrl}/register`, user)
      .pipe(
        map(response => {
          console.log('Resposta recebida do servidor', response);
          if (response.titulo === 'Sucesso') {
            this.alertService.showSuccess(response.mensagem);
            this.login(user.email, user.senha).subscribe({
              next: () => {
                console.log('Redirecionando para home após registro');
                window.location.href = '/home';
              },
              error: (error) => {
                console.error('Erro ao logar após registro', error);
                throw new Error(error.message || 'Erro ao logar após registro');
              }
            });
            return response;
          } else {
            this.alertService.showError('Falha: ' + response.mensagem);
            return response;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro no registro', error);
          return throwError(() => new Error(error.error.mensagem || 'Erro desconhecido'));
        })
      );
  }

  recoveryPassword(user: { nome: string, email: string, senha: string, confirmaSenha: string, dtNascimento: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/recoveryPassword`, user)
      .pipe(
        switchMap(response => {
          if (response.titulo === 'Sucesso') {
            this.alertService.showSuccess(response.mensagem);
            return this.login(user.email, user.senha);
          } else {
            this.alertService.showError('Falha: ' + response.mensagem);
            return throwError(() => new Error(response.mensagem || 'Falha na recuperação de senha'));
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.alertService.showError(error.error.mensagem || 'Erro desconhecido');
          return throwError(() => new Error(error.error.mensagem || 'Erro desconhecido'));
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token_api');
  }

  logout(): void {
    console.log('Logout iniciado');
    localStorage.removeItem('token_api');
    localStorage.removeItem('login_time');
    localStorage.removeItem('encrypted_email');
    localStorage.removeItem('encrypted_password');
  }

  startSessionCheck(): void {
    if (this.sessionCheckInterval) {
      clearInterval(this.sessionCheckInterval);
    }

    this.sessionCheckInterval = setInterval(() => {
      const loginTime = localStorage.getItem('login_time');
      if (loginTime) {
        const currentTime = new Date().getTime();
        const loginTimeDate = new Date(loginTime).getTime();
        const oneHour = 60 * 60 * 1000; // 1 hora


        console.log(`Tempo de sessão: ${currentTime - loginTimeDate} ms`);
        if (currentTime - loginTimeDate >= oneHour) {
          clearInterval(this.sessionCheckInterval);
          this.showSessionExpiredAlert();
        }
      }
    }, (5 * 60 * 100)); // 5 minutoss
  }

  showSessionExpiredAlert(): void {
    console.log('Sessão expirada');
    Swal.fire({
      title: 'Sessão Expirada',
      text: 'Deseja continuar conectado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Continuar Conectado',
      cancelButtonText: 'Logout',
      allowOutsideClick: false,
      width: '300px',
      backdrop: false
    }).then(result => {
      if (result.isConfirmed) {
        this.renewSession();
      } else {
        this.logout();
        window.location.href = '/login';
      }
    });
  }

  renewSession(): void {
    console.log('Renovação da sessão iniciada');
    const encryptedEmail = localStorage.getItem('encrypted_email');
    const encryptedPassword = localStorage.getItem('encrypted_password');

    if (encryptedEmail && encryptedPassword) {
      const email = this.decrypt(encryptedEmail);
      const password = this.decrypt(encryptedPassword);
      this.login(email, password).subscribe({
        next: () => {
          this.alertService.showSuccess('Sessão renovada com sucesso');
        },
        error: () => {
          this.alertService.showError('Falha ao renovar sessão. Por favor, faça login novamente.');
          this.logout();
          window.location.href = '/login';
        }
      });
    } else {
      this.logout();
      window.location.href = '/login';
    }
  }

  private encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.encryptionKey).toString();
  }

  private decrypt(value: string): string {
    const bytes = CryptoJS.AES.decrypt(value, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  private handleBeforeUnload(event: Event) {
    if (Swal.isVisible()) {
      this.logout();
    }
  }
}
