import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../models/interfaces';
import { APP_FEATURE_NAME } from '../action/app.action';

const selectApp = createFeatureSelector<AppState>(APP_FEATURE_NAME);

export const selectAllApp = createSelector(selectApp, (state) => state);

export const selectNavbar = createSelector(
  selectApp,
  (state) => state.userData?.navbar?.menus
);

export const selectUserData = createSelector(
  selectApp,
  (state) => state.userData?.user
);
