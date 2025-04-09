import { State, createReducer, on } from '@ngrx/store';
import { AuthActions } from '../action/auth.action';
import { AuthState } from '../models/auth-state.interface';

const authInitialState: AuthState = {
  email: '',
};

export const authReducer = createReducer(
  authInitialState,
  on(AuthActions.setUserState, (state, { email, otpStartTime }) => ({
    ...state,
    email,
    otpStartTime,
  }))
);
// // Set otp action
// on(AuthActions.setOtp, (state, { otp }) => ({ ...state, otp })),
// // Set user code action
// on(AuthActions.setUserState, (state, { code }) => ({ ...state, code })),
// // Set mobile & state action
// on(
//   AuthActions.setMobileAndState,
//   (state, { code, countryCode, mobileNumber }) => ({
//     ...state,
//     code,
//     countryCode,
//     mobileNumber,
//   })
// ),
// // Set register data
// on(AuthActions.setRegisterData, (state, { firstName, lastName }) => ({
//   ...state,
//   firstName,
//   lastName,
// })),
// // Reset state action
// on(AuthActions.resetState, () => ({
//   countryCode: '',
//   mobileNumber: '',
//   otp: '',
//   code: -1,
//   firstName: '',
//   lastName: '',
// }))
// );
