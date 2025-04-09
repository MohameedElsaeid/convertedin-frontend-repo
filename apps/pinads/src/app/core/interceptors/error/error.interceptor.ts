import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { LocalStorageConstants } from '@pinads/shared/constants';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export const ErrorInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const toastService = inject(MessageService);
  const translate = inject(TranslateService);
  const router = inject(Router);
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 500) {
        toastService.add({
          summary: translate.instant('generalErr'),
          severity: 'error',
          life: 6000,
        });
      } else {
        if (error.error?.message) {
          toastService.add({
            summary: error.error.message,
            severity: 'error',
          });
        }
      }
      if (error.status === 403) {
        localStorage.removeItem(LocalStorageConstants.TOKEN);
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    })
  );
};
