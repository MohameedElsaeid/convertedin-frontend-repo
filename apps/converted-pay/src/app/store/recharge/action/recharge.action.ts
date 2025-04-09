import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  PaymentConfigurations,
  PaymentMethod,
  SocialAccount,
} from '@converted-pay/shared/api';

export const RECHARGE_FEATURE_NAME = 'recharge';

export const RechargeActions = createActionGroup({
  source: RECHARGE_FEATURE_NAME,
  events: {
    'Set Recharge Amount': props<{
      rechargeAmount: number;
      vatFee: number;
      agencyFee: number;
      totalAmount: number;
      usePromotionalBalance: boolean;
    }>(),

    'Set Recharge Social Account': props<{
      socialAccount: SocialAccount;
    }>(),

    'Set Recharge Payment Configuration': props<{
      fees: PaymentConfigurations;
    }>(),

    'Set Recharge Payment Method': props<{ paymentMethod: PaymentMethod }>(),

    'Set Recharge Mobile Country Code': props<{
      countryCode: string;
    }>(),

    'Set Recharge Mobile Number': props<{ phone: undefined | string }>(),
    'Reset Recharge State': emptyProps(),
    'Set Use Promotional': props<{ usePromotionalBalance: boolean }>(),
  },
});
