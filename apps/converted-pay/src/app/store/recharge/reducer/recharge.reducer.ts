import { createReducer, on } from '@ngrx/store';
import { RechargeState } from '../models/recharge-state.interface';
import { RechargeActions } from '../action/recharge.action';

const rechargeInitialState: RechargeState = {
  socialAccount: undefined,
  rechargeAmount: undefined,
  fees: undefined,
  countryCode: undefined,
  mobile: undefined,
  paymentMethod: undefined,
  agencyFee: undefined,
  vatFee: undefined,
  totalAmount: undefined,
  usePromotionalBalance: false,
};

export const rechargeReducer = createReducer(
  rechargeInitialState,

  on(
    RechargeActions.setRechargeAmount,
    (
      state,
      { rechargeAmount, agencyFee, totalAmount, vatFee, usePromotionalBalance }
    ) => ({
      ...state,
      rechargeAmount,
      agencyFee,
      totalAmount,
      vatFee,
      usePromotionalBalance,
    })
  ),

  on(RechargeActions.setRechargeSocialAccount, (state, { socialAccount }) => ({
    ...state,
    socialAccount,
  })),

  on(RechargeActions.setRechargePaymentConfiguration, (state, { fees }) => ({
    ...state,
    fees,
  })),

  on(RechargeActions.setRechargePaymentMethod, (state, { paymentMethod }) => ({
    ...state,
    paymentMethod,
    mobile: undefined,
    countryCode: undefined,
  })),

  on(
    RechargeActions.setRechargeMobileCountryCode,
    (state, { countryCode }) => ({
      ...state,
      countryCode,
    })
  ),

  on(RechargeActions.setRechargeMobileNumber, (state, { phone }) => ({
    ...state,
    mobile: phone,
  })),
  on(RechargeActions.resetRechargeState, (state) => ({
    ...rechargeInitialState,
  })),
  on(RechargeActions.setUsePromotional, (state, { usePromotionalBalance }) => ({
    ...state,
    usePromotionalBalance,
  }))
);
