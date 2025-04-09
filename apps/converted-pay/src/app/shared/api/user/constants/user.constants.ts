import { ApiConstants } from '@converted-pay/shared/constants';

export class UserEndpoints {
  // Get user referrals endpoint
  static readonly GET_REFERRALS = ApiConstants.INITIAL + '/users/referrals';
  // Get user referrals transactions endpoint
  static readonly GET_REFERRALS_TRANSACTIONS =
    ApiConstants.INITIAL + '/users/referrals/transactions';
  // Get user profile endpoint
  static readonly GET_PROFILE = ApiConstants.INITIAL + '/users/profile';
  // Update user profile endpoint
  static readonly UPDATE_PROFILE =
    ApiConstants.INITIAL + '/users/profile/update';
  // Upload TAX endpoint
  static readonly UPLOAD_TAX = ApiConstants.INITIAL + '/users/tax-card/update';

  static readonly FAQ = ApiConstants.INITIAL + '/faqs';
}
