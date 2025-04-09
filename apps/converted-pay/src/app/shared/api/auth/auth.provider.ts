import { Provider } from '@angular/core';
import { AuthApiService } from './services/auth.service';
import { AuthApi } from './base/auth.base';

export const provideAuthApi: () => Provider = () => ({
  provide: AuthApi,
  useClass: AuthApiService,
});
