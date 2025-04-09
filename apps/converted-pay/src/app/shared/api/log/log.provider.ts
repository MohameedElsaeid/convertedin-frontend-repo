import { Provider } from '@angular/core';
import { LogApi } from './base/log.base';
import { LogApiService } from './services/log.service';

export const provideLogApi: () => Provider = () => ({
  provide: LogApi,
  useClass: LogApiService,
});
