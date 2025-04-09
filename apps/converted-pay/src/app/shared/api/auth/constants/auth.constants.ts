import { ApiConstants } from '@converted-pay/shared/constants';

export class AuthEnpoints {
  // Login endpoint
  static readonly LOGIN = ApiConstants.INITIAL + '/auth/login';
  // Register endpoint
  static readonly REGISTER = ApiConstants.INITIAL + '/auth/register';
  // Complete register endpoint
  static readonly COMPLETE_REGISTER =
    ApiConstants.INITIAL + '/users/register/complete';
  // User data endpoint
  static readonly GET_USER_DATA = ApiConstants.INITIAL + '/users/profile';

  static readonly SEND_OTP = ApiConstants.INITIAL + '/auth/send/otp';
  static readonly VERIFY_OTP = ApiConstants.INITIAL + '/auth/verify/otp';
  static readonly UPDATE_PASSWORD =
    ApiConstants.INITIAL + '/auth/password/update';
  static readonly UPDATE_FBCAMPAIGN_DATA =
    ApiConstants.INITIAL + '/users/update/click';

  static readonly GET_COUNTRY_LIST = ApiConstants.INITIAL + '/countries';
}
