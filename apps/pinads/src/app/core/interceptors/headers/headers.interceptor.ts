import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { LocalStorageConstants } from '@pinads/shared/constants';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export const HeadersInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const router = inject(Router);
  const translate = inject(TranslateService);
  let modifiedReq = request.clone({
    setHeaders: {
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      'Accept-Language': translate.currentLang || 'en',
    },
  });

  // Token header append
  const token = localStorage.getItem(LocalStorageConstants.TOKEN);
  if (token) {
    modifiedReq = modifiedReq.clone({
      headers: modifiedReq.headers.append('Authorization', `Bearer ${token}`),
    });
  }
  return next(modifiedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem(LocalStorageConstants.TOKEN);
        router.navigate(['/auth']);
      }
      return throwError(() => error);
    })
  );
};
