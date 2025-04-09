import { Provider } from '@angular/core';
import { AccountsApi } from './base/accounts.base';
import { AccountsApiService } from './services/accounts.service';

export const provideAccountsApi: () => Provider = () => {
  return {
    provide: AccountsApi,
    useClass: AccountsApiService,
  };
};
