import { ApiConstants } from '@pinads/shared/constants/api/api.constant';

export class BrandEndpoints {
  /**
   * get brands endpoint URL.
   */
  static readonly GET_BRANDS =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/brands';

  /**
   * get brand locations endpoint URL.
   */
  static readonly GET_BRAND_LOCATIONS = (brandId: string) =>
    ApiConstants.INITIAL +
    ApiConstants.VERSION(1) +
    `/brands/${brandId}/locations`;

  /**
   * update brand endpoint URL.
   */
  static readonly UPDATE_BRAND = (brandId: string) =>
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + `/brands/${brandId}`;

  /**
   * get active brand endpoint URL.
   */
  static readonly GET_ACTIVE_BRAND =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + `/brands/active`;

  static readonly GET_BRAND_METRICS = (brandId: string) =>
    ApiConstants.INITIAL + ApiConstants.VERSION(1) +  `/brands/${brandId}/metrics`;
}
