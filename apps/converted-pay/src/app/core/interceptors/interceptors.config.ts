import { HttpInterceptorFn } from '@angular/common/http';
import { HeadersInterceptor } from './headers/headers.interceptor';
import { ErrorInterceptor } from './error/error.interceptor';

export function ProvideInterceptors(): HttpInterceptorFn[] {
  return [
    HeadersInterceptor,
    ErrorInterceptor,
    // { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ];
}
