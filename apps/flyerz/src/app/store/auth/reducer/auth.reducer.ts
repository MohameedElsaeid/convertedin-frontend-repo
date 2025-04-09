import { createReducer, on } from '@ngrx/store';
import { AuthState } from '../models/auth-state.interface';
import { AuthActions } from '../action/auth.action';

const authInitialState: AuthState = {
  countryCode: '',
  mobileNumber: '',
  otp: '',
  code: -1,
  firstName: '',
  lastName: '',
};

export const authReducer = createReducer(
  authInitialState,
  // Set mobile & country code action
  on(
    AuthActions.setMobileNumberAndCountryCode,
    (state, { countryCode, mobileNumber }) => ({
      ...state,
      mobileNumber,
      countryCode,
    })
  ),
  // Set otp action
  on(AuthActions.setOtp, (state, { otp }) => ({ ...state, otp })),
  // Set user code action
  on(AuthActions.setUserState, (state, { code }) => ({ ...state, code })),
  // Set mobile & state action
  on(
    AuthActions.setMobileAndState,
    (state, { code, countryCode, mobileNumber }) => ({
      ...state,
      code,
      countryCode,
      mobileNumber,
    })
  ),
  // Set register data
  on(
    AuthActions.setRegisterData,
    (
      state,
      {
        firstName,
        lastName,
        mobileNumber,
        countryCode,
        password,
        passwordConfirmation,
        code,
      }
    ) => ({
      ...state,
      firstName,
      lastName,
      countryCode,
      mobileNumber,
      password,
      passwordConfirmation,
      code,
    })
  ),
  // Reset state action
  on(AuthActions.resetState, () => ({
    countryCode: '',
    mobileNumber: '',
    otp: '',
    code: -1,
    firstName: '',
    lastName: '',
  }))
);
