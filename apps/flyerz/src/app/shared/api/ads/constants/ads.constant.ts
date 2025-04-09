import { ApiConstants } from '@flyerz/shared/constants';

export class AdsEndpoints {
  // Insights endpoint
  static readonly INSIGHTS =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/insights';
  // Ads endpoint
  static readonly GET_ADS =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/ads';
  // Ad close reasons endpoint
  static readonly GET_FINISH_AD_REASONS =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/ad/finish-reasons';
  // Finish ad endpoint
  static readonly FINISH_AD =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/ad/finish';
  // Ad details endpoint
  static readonly GET_AD_DETAILS =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/ads';
  // Update ad budget & duration
  static readonly UPDATE_BUDGET_DURATION =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/ads/update';
  // Get ad leads
  static readonly GET_LEADS = (adId: number) =>
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + `/ads/${adId}/leads`;
}
