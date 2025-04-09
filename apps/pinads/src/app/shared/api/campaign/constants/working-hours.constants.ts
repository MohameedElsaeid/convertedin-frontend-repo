import { ApiConstants } from '@pinads/shared/constants/api/api.constant';

export class WorkingHoursEndpoints {
  /**
   * The get working hours endpoint URL.
   */
  static readonly GET_WORKING_HOURS =(brandId:string)=>
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + `/brands/${brandId}/work-times`;
}
