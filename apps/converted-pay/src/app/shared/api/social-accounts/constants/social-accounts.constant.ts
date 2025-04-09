import { ApiConstants } from '@converted-pay/shared/constants';

export class SocialAccountsEndpoints {
  // Get social accounts endpoint
  static readonly GET_SOCIAL_ACCOUNTS =
    ApiConstants.INITIAL + '/social/accounts';
  // Get user business endpoint
  static readonly GET_USER_BUSINESSES =
    ApiConstants.INITIAL + '/social/accounts/businesses';

  static readonly GET_Google_BUSINESSES =
    ApiConstants.INITIAL + '/social/accounts/google/ad-accounts';
  static readonly GET_Meta_BUSINESSES =
    ApiConstants.INITIAL + '/social/accounts/facebook/businesses';
  // Connect social account endpoint
  static readonly CONNECT_SOCIAL_ACCOUNT =
    ApiConstants.INITIAL + '/social/accounts/connect';
  // Connect social account endpoint
  static readonly CONNECT_GOOGLE_ACCOUNT =
    ApiConstants.INITIAL + '/social/accounts/google/connect';
  // Connect social account endpoint
  static readonly CONNECT_META_ACCOUNT =
    ApiConstants.INITIAL + '/social/accounts/facebook/connect';
  static readonly GET_CONNECTED_ACCOUNTS =
    ApiConstants.INITIAL + '/social/accounts/connected';
  static readonly DELETE_CONNECTED_ACCOUNT =
    ApiConstants.INITIAL + '/social/accounts/connected/delete';
  static readonly ADD_TO_PLATFORM_WAIT_LIST =
    ApiConstants.INITIAL + '/users/add-to/waite/list';
}
