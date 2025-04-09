import { HttpInterceptorFn } from '@angular/common/http';
import { appInterceptors } from './headers/headers.interceptor';

export const flyerzInterceptors: HttpInterceptorFn[] = [appInterceptors];
