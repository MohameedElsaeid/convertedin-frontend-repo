import { Provider } from '@angular/core';
import { CreateAdApi } from './base/create-ad.base';
import { CreateAdApiService } from './services/create-ad.service';

export const provideCreateAdApi: () => Provider = () => ({
  provide: CreateAdApi,
  useClass: CreateAdApiService,
});
