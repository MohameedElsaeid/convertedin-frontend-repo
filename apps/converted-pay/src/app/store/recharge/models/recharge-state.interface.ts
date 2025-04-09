import {
  PaymentConfigurations,
  PaymentMethod,
  SocialAccount,
} from '@converted-pay/shared/api';

export interface RechargeState {
  socialAccount: SocialAccount | undefined;
  fees: PaymentConfigurations | undefined;
  rechargeAmount: number | undefined;
  paymentMethod: PaymentMethod | undefined;
  countryCode: string | undefined;
  mobile: string | undefined;
  agencyFee: number | undefined;
  vatFee: number | undefined;
  totalAmount: number | undefined;
  usePromotionalBalance: boolean ;
}
