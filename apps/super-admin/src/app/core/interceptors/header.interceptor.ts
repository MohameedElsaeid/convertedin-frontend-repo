import { HttpErrorResponse, HttpHandlerFn, HttpHeaders, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { LocalStorageConstants } from "@super-admin/shared/constants";
import { catchError, throwError } from "rxjs";

export const HeadersInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
  ) => {
    const router = inject(Router);
    let modifiedReq = request.clone({
      headers: new HttpHeaders({
        Accept: 'application/json',
        // 'Content-Type': 'application/json',
      }),
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
  