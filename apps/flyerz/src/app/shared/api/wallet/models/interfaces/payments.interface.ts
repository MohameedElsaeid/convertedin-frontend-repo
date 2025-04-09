import { PaymentMethod } from './payment-method.interface';

export interface Payments {
  paymentMethods: Array<PaymentMethod>;
  announcement?: string;
}
