import { inject } from '@angular/core';
import {
  HttpHeaders,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { LocalStorageConstants } from '../../../shared/constants';
import { Router } from '@angular/router';

export const appInterceptors: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const __router = inject(Router);
  // Local storage consts
  const language = localStorage.getItem(LocalStorageConstants.LANGUAGE) || 'ar';
  const countryId = localStorage.getItem(LocalStorageConstants.COUNTRY_ID) || 1;
  const vendorKey = localStorage.getItem(LocalStorageConstants.PARTENER_TOKEN)!;

  // Basic headers
  let generalReq = request.clone({
    headers: new HttpHeaders({
      platform: 'sdk',
      'api-key': vendorKey,
      'Accept-Language': language,
      country: countryId,
    }),
  });

  const currentContentType = request.headers.get('Content-Type');
  if (!currentContentType) {
    generalReq = generalReq.clone({
      headers: generalReq.headers.append('Content-Type', `application/json`),
    });
  }

  // Token header append
  const token = localStorage.getItem(LocalStorageConstants.TOKEN);
  if (token) {
    generalReq = generalReq.clone({
      headers: generalReq.headers.append('Authorization', `Bearer ${token}`),
    });
  }

  return next(generalReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem(LocalStorageConstants.TOKEN);
        __router.navigate(['/auth']);
      }
      return throwError(() => error);
    })
  );
};
