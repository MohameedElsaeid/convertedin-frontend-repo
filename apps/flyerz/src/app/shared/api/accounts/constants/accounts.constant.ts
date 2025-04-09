import { ApiConstants } from '@flyerz/shared/constants';

export class AccountsEndpoints {
  // Get social media channels
  static readonly GET_SOCIAL_MEDIA_CHANNELS =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/channels';
  // Get business categories
  static readonly GET_CATEGORIES =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/categories';
  // Get facebook pages
  static readonly FACEBOOK_PAGES =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/users/facebook/pages';
  // Connect to social media
  static readonly CONNECT_SOCIAL_MEDIA =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/channels/connect';
  // Connection details
  static readonly GET_CONNECTION_DETAILS =
    ApiConstants.INITIAL +
    ApiConstants.VERSION(2) +
    '/users/connections/details';
  // Refresh facebook token
  static readonly REFRESH_FB_TOKEN =
    ApiConstants.INITIAL +
    ApiConstants.VERSION(2) +
    '/users/facebook/token/refresh';
  static readonly REASSIGN_ACCOUNT =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/users/facebook/assign';
}
