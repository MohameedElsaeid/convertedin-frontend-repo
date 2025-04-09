import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';

export const ErrorInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const toastService = inject(MessageService);
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 500) {
        toastService.add({
          summary:
            "Oops! It seems like something unexpected happened on our end. Don't worry, our team is on it! Please try again later.",
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
      return throwError(() => error);
    })
  );
};
