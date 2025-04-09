import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { DEFAULT_LANG, LocalStorageConstants } from '@converted-pay/shared/constants';
import { Router } from '@angular/router';

export const HeadersInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const activeLang =
    localStorage.getItem(LocalStorageConstants.LANGUAGE) || DEFAULT_LANG;
  const router = inject(Router);
  let modifiedReq = request.clone({
    headers: new HttpHeaders({
      Accept: 'application/json',
      // 'Content-Type': 'application/json',
      'Accept-Language': activeLang,
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

// @Injectable()
// export class HeadersInterceptor implements HttpInterceptor {
//   constructor(private __router: Router,private translate:TranslateService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
//     // Basic headers
//     let generalReq = request.clone({
//       headers: new HttpHeaders({
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'Accept-Language': this.translate.currentLang || 'en',
//       }),
//     });

//     // Token header append
//     const token = localStorage.getItem(LocalStorageConstants.TOKEN);
//     if (token) {
//       generalReq = generalReq.clone({
//         headers: generalReq.headers.append('Authorization', `Bearer ${token}`),
//       });
//     }

//     return next.handle(generalReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           localStorage.removeItem(LocalStorageConstants.TOKEN);
//           this.__router.navigate(['/auth']);
//         }
//         return throwError(() => error);
//       })
//     );
//   }
// }
