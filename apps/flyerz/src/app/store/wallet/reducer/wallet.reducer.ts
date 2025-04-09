import { createReducer, on } from '@ngrx/store';
import { WalletState } from '../models/wallet.interface';
import { WalletActions } from '../action/wallet.action';

const walletInitialState: WalletState = {
  paymentMethod: undefined,
  budget: undefined,
};

export const walletReducer = createReducer(
  walletInitialState,
  // Set payment method
  on(WalletActions.setPaymentMethod, (state, { paymentMethod }) => ({
    ...state,
    paymentMethod,
  })),
  // Reset state
  on(WalletActions.resetState, () => ({
    paymentMethod: undefined,
    budget: undefined,
  })),
  // Set budget
  on(WalletActions.setRechargeBudget, (state, { budget }) => ({
    ...state,
    budget,
  }))
);
