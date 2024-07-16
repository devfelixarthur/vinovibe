import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.staging';
import { AlertService } from './alert-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient,
    private alertService: AlertService

  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          if (response.titulo === 'Sucesso') {
            localStorage.setItem('token_api', response.mensagem);
            return response;
          } else {
            throw new Error(response.mensagem || 'Falha no login');
          }
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => new Error("Usuário ou Senha inválidos"));
        })
      );
  }

  register(user: { nome: string, email: string, senha: string, dtNascimento: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user)
      .pipe(
        switchMap(response => {
          if (response.titulo === 'Sucesso') {
            this.alertService.showSuccess(response.mensagem);
            return this.login(user.email, user.senha);
          } else {
            this.alertService.showError('Falha: ' + response.mensagem);
            return throwError(() => new Error(response.mensagem || 'Falha no cadastro'));
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.alertService.showError(error.error.mensagem || 'Erro desconhecido');
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
    localStorage.removeItem('token_api');
  }
}
