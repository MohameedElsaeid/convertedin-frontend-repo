import { ApiConstants } from '@pinads/shared/constants/api/api.constant';

export class AuthEndpoints {
  /**
   * The login endpoint URL.
   */
  static readonly LOGIN =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/auth/login';

  /**
   * The logout endpoint URL.
   */
  static readonly LOGOUT =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/auth/logout';

  /**
   * The register endpoint URL.
   */
  static readonly REGISTER =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/auth/register';

  /**
   * The OTP endpoint URL.
   */
  static readonly OTP =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/otp/verify';

  /**
   * The Resend OTP endpoint URL.
   */
  static readonly RESEND_OTP =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/otp/resend';
  static readonly FORGOT_PASSWORD =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/auth/forgot-password';
  static readonly FORGOT_PASSWORD_VERIFY =
    ApiConstants.INITIAL +
    ApiConstants.VERSION(1) +
    '/auth/reset-password/verify';
  static readonly RESET_PASSWORD =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/auth/reset-password';
  static readonly GET_CATEGORIES =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/categories';

  static readonly IMPERSONATE_LOGIN =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/auth/impersonate-login';

  static readonly GET_USER_PROFILE =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/auth/profile';
}
