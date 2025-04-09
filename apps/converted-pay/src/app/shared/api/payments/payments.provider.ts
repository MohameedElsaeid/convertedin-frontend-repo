import { Provider } from '@angular/core';
import { PaymentsApiService } from './services/payments.service';
import { PaymentsApi } from './base/payments.base';

export const providePaymentsApi: () => Provider = () => ({
  provide: PaymentsApi,
  useClass: PaymentsApiService,
});
