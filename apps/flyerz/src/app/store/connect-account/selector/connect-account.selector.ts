import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConnectAccountState } from '../models/connect-account.interface';
import { StoreKeys } from '@flyerz/store/store-keys.enum';

// Connect account feature selector
const selectConnectAccount = createFeatureSelector<ConnectAccountState>(
  StoreKeys.CONNECT_ACCOUNT
);

// Connect account selector
export const selectAllConnectAccount = createSelector(
  selectConnectAccount,
  (state) => state
);
