import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'apps/redmose/src/environment/environment';
import { TokenConstants } from '../../../shared/constants';
import { ErrorService } from '../../../shared/services';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private __errorService: ErrorService,private __router:Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && environment.production) {
          localStorage.removeItem(TokenConstants.TOKEN_KEY);
          window.location.href = environment.remoteUrl;
        }
        if(error.status === 403) {
          // IF WE DECIDED TO CONSIDER ROUTING INSTEAD
          // this.__router.navigateByUrl('/dashboards/not-allowed')
          this.__errorService.displayToastError(`You Don't have the right access`);
        }
        if (request.headers.has('show-error')) {
          request.headers.delete('show-error');
          this.__errorService.displayToastError(`${error.status}`);
        }
        return throwError(() => error);
      })
    );
  }
}
