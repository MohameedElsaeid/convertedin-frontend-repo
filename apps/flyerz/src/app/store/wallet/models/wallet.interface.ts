import { PaymentMethod } from '@flyerz/shared/api';

export interface WalletState {
  paymentMethod: PaymentMethod | undefined;
  budget: number | undefined;
}
