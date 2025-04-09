import { ApiConstants } from '@pinads/shared/constants/api/api.constant';

export class CampaignEndpoints {
  static readonly CREATE_CAMPAIGN =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/campaigns';

  static readonly GET_ALL_CAMPAIGNS =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/campaigns';

  static readonly GENERATE_PAYMENT_LINK = (id: string) =>
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + `/campaigns/${id}/pay`;

  static readonly GET_CAMPAIGN_DETAILS = (id: string) =>
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + `/campaigns/${id}`;
  
  static readonly UPDATE_CAMPAIGN = (id: string) =>
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + `/campaigns/${id}`;

  static readonly GET_OPTIMIZATION_LOG = (id: string) =>
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + `/campaigns/${id}/logs`;
}
