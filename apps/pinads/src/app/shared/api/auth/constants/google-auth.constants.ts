import { ApiConstants } from '@pinads/shared/constants/api/api.constant';

export class GoogleAuthEndpoints {
  /**
   * The refresh token endpoint URL.
   */
  static readonly REFRESH_TOKEN =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/google/refresh';
  /**
   * check google oAuth token endpoint URL.
   */
  static readonly CHECK_GOOGLE_CONNECTION =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/google/check';
  /**
   * The GOOGLE AUTH TOKEN endpoint URL.
   */
  static readonly GOOGLE_AUTH_TOKEN = 'https://oauth2.googleapis.com/token';
  /**
   * Connect Google endpoint URL.
   */
  static readonly GOOGLE_Connect =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/google/connect';
}
