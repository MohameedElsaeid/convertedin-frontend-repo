import { ApiConstants } from '../../../constants';

export class AuthEndpoints {
  // Countries list
  static readonly COUNTRIES =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/countries';
  // Mobile check
  static readonly MOBILE_CHECK =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/auth/mobile-check';
  // Send OTP
  static readonly SEND_OTP =
    ApiConstants.INITIAL +
    ApiConstants.VERSION(1) +
    '/mobile-verification/send';
  // Verify OTP
  static readonly VERIFY_OTP =
    ApiConstants.INITIAL +
    ApiConstants.VERSION(1) +
    '/mobile-verification/verify';
  // Login
  static readonly LOGIN =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/auth/login';
  // Register
  static readonly REGISTER =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/auth/registration';
  // Logout
  static readonly LOGOUT =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/auth/logout';
  // User data
  static readonly USER_DATA =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/users/data';
  // Validations
  static readonly GET_VALIDATIONS =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/validations';
  // Update user data endpoint
  static readonly UPDATE_USER_DATA =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/users/data';
  // Remove account endpoint
  static readonly DELETE_ACCOUNT =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/users/delete';
  // Change phone number endpoint
  static readonly CHANGE_NUMBER =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/phone/update';
  // Get vendor data endpoint
  static readonly VENDOR_DATA =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/vendors';
  // Verify email endpoint
  static readonly VERIFY_EMAIL =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/users/email/verify';
  // Verify OTP Twilio endpoint
  static readonly VERIFY_OTP_TWILIO =
    ApiConstants.INITIAL +
    ApiConstants.VERSION(1) +
    '/mobile-verification/twilio/verify';
  // Login with password endpoint
  static readonly LOGIN_WITH_PASSWORD =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/auth/password/login';
  // Forgot password endpoint
  static readonly FORGOT_PASSWORD =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/auth/password/forgot';
  // Change password endpoint
  static readonly CHANGE_PASSWORD =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/users/password/update';
}
