import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../models/auth-state.interface';
import { StoreKeys } from '@flyerz/store/store-keys.enum';

// Auth feature selector
const selectAuth = createFeatureSelector<AuthState>(StoreKeys.AUTH);

// OTP selector
export const selectOtp = createSelector(selectAuth, (state) => state.otp);
// Mobile selector
export const selectMobile = createSelector(selectAuth, (auth: AuthState) => ({
  mobileNumber: auth.mobileNumber,
  countryCode: auth.countryCode,
}));
// Status code selector
export const selectCode = createSelector(selectAuth, (state) => state.code);
// Auth data selector
export const selectAllAuth = createSelector(selectAuth, (state) => state);
