import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { WalletActionTypes } from '../models/wallet.enum';
import { PaymentMethod } from '@flyerz/shared/api';

export const WalletActions = createActionGroup({
  source: 'Wallet',
  events: {
    [WalletActionTypes.SET_PAYMENT_METHOD]: props<{
      paymentMethod: PaymentMethod;
    }>(),

    [WalletActionTypes.SET_BUDGET]: props<{ budget: number }>(),

    [WalletActionTypes.RESET]: emptyProps(),
  },
});
