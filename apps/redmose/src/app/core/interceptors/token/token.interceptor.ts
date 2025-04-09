import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenConstants } from '../../../shared/constants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(() => {
        localStorage.setItem(
          'TOKEN',
          this.getToken(TokenConstants.XSRF_TOKEN_KEY)
        );
      })
    );
  }

  getToken(cookieKey: string): string {
    const cookies = document.cookie.split(';').filter((item) => item !== ' ');
    const requiredCookie = cookies.find((item) => item.includes(cookieKey));

    return requiredCookie?.split('=')[1];
  }
}
