import { PaymentConfiguration } from './payment-configuration.interface';

export interface PaymentConfigurations {
  data: {
    [key: string]: PaymentConfiguration;
  };
}
