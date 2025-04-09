import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { StoreKeys } from '@flyerz/store/store-keys.enum';

// App feature selector
const selectApp = createFeatureSelector<AppState>(StoreKeys.APP);

// Token selector
export const selectToken = createSelector(selectApp, (state) => state.token);
// Currency selector
export const selectCurrency = createSelector(
  selectApp,
  (state) => state.userData?.user.currency.symbol
);
// Connection details selector
export const selectConnectionDetails = createSelector(
  selectApp,
  (state) => state.connectionDetails
);
// Validations selector
export const selectValidations = createSelector(
  selectApp,
  (state) => state.validations
);
// User wallet selector
export const selectUserWallet = createSelector(selectApp, (state) => ({
  wallet: state.userData?.user.wallet,
  currency: state.userData?.user.currency,
}));

export const selectUserData = createSelector(
  selectApp,
  (state) => state.userData
);
