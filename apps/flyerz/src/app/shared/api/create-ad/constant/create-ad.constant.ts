import { ApiConstants } from '@flyerz/shared/constants';

export class CreateAdEndpoints {
  // Get channels endpoint
  static readonly GET_CHANNELS =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/channels';
  // Get facebook posts
  static readonly GET_FACEBOOK_POSTS =
    ApiConstants.INITIAL +
    ApiConstants.VERSION(2) +
    '/users/facebook/pages/posts';
  // Get instagram posts
  static readonly GET_INSTAGRAM_POSTS =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/users/instagram/posts';
  // Get ad goals
  static readonly GET_GOALS =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/goals';
  // Create Ad by AI endpoint
  static readonly CREATE_AD_BY_AI =
    ApiConstants.INITIAL +
    ApiConstants.VERSION(2) +
    '/ai/create-ad-suggestions';
  // Match ad suggestions endpoint
  static readonly MATCH_AD_SUGGESTIONS =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/ai/match-ad-suggestions';
  // Create ad endpoint
  static readonly CREATE_AD =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/ad';
  // Reach estimate endpoint
  static readonly REACH_ESTIMATE =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/reach-estimate';
  // Get interests endpoint
  static readonly GET_INTERESTS =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/interests';
  // Get demographics endpoint
  static readonly GET_DEMOGRAPHICS =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/demographics';
  // Get behaviours endpoint
  static readonly GET_BEHAVIOURS =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/behaviors';
  // Get all cities endpoint
  static readonly GET_CITIES =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/cities';
  // Get all areas endpoint
  static readonly GET_AREAS = (cityId: number) =>
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + `/${cityId}/areas`;
}
