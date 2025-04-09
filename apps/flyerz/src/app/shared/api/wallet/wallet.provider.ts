import { Provider } from '@angular/core';
import { WalletApi } from './base/wallet.base';
import { WalletApiService } from './services/wallet.service';

export const provideWalletApi: () => Provider = () => ({
  provide: WalletApi,
  useClass: WalletApiService,
});
