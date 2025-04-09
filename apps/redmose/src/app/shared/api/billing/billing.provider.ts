import { Provider } from '@angular/core';
import { BillingApi } from './base/billing.base';
import { BillingApiService } from './services/billing.service';

export const provideBillingApi: () => Provider = () => ({
  provide: BillingApi,
  useClass: BillingApiService,
});
