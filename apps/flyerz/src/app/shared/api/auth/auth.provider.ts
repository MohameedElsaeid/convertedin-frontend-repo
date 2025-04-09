import { Provider } from '@angular/core';
import { AuthApi } from './base/auth';
import { AuthApiService } from './services/auth.service';

export const provideAuthApi: () => Provider = () => ({
  provide: AuthApi,
  useClass: AuthApiService,
});
