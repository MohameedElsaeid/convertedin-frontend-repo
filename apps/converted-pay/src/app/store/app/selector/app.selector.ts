import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { APP_FEATURE_NAME } from '../models/app-actions.enum';

const selectApp = createFeatureSelector<AppState>(APP_FEATURE_NAME);

export const selectUserData = createSelector(
  selectApp,
  (state) => state.userData
);
export const selectGoogleAccounts = createSelector(selectUserData, (user) =>
  user?.connectedAccounts?.filter((user) => user.platformId === 1)
);
export const selectFacebookAccounts = createSelector(selectUserData, (user) =>
  user?.connectedAccounts?.filter((user) => user.platformId === 2)
);

export const selectCurrency = createSelector(
  selectUserData,
  (user) => user?.currency?.symbol
);
