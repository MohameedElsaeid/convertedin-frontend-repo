import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthActionTypes } from '../models/auth.action.emum';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    [AuthActionTypes.SET_MOBILE_AND_COUNTRY_CODE]: props<{
      mobileNumber: string;
      countryCode: string;
    }>(),

    [AuthActionTypes.SET_OTP]: props<{
      otp: string;
    }>(),

    [AuthActionTypes.SET_USER_STATE]: props<{ code: number }>(),

    [AuthActionTypes.SET_MOBILE_AND_STATE]: props<{
      mobileNumber: string;
      countryCode: string;
      code: number;
    }>(),

    [AuthActionTypes.SET_REGISTER_DATA]: props<{
      firstName: string;
      lastName: string;
      mobileNumber: string;
      countryCode: string;
      password: string;
      passwordConfirmation: string;
      code: number;
    }>(),

    [AuthActionTypes.RESET_STATE]: emptyProps(),
  },
});
