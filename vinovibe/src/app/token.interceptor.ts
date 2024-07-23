import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { SpinnerService } from './services/spinner.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludedUrls = ['/auth/login', '/auth/register', '/auth/recoveryPassword'];
    const isExcludedUrl = excludedUrls.some(url => req.url.includes(url));

    if (!isExcludedUrl) {
      this.spinnerService.show();
    }

    const token = localStorage.getItem('token_api');
    const clonedRequest = token ? req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    }) : req;

    return next.handle(clonedRequest).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            this.spinnerService.hide();
          }
        },
        (error: HttpErrorResponse) => {
          this.spinnerService.hide();
        }
      ),
      finalize(() => {
        this.spinnerService.hide();
      })
    );
  }
}
