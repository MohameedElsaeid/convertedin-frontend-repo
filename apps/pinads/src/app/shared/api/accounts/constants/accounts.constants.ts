import { ApiConstants } from '@pinads/shared/constants/api/api.constant';

export class AccountsEndpoints {
  /**
   * The login endpoint URL.
   */
  static readonly GET_MANAGER_LIST =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/managers';

  /**
   * The logout endpoint URL.
   */
  static readonly MAKE_MANAGER_PRIMARY =(managerId:string)=>
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + `/managers/${managerId}/primary`;

  /**
   * The register endpoint URL.
   */
  static readonly GET_CUSTOMER_LIST =(managerId:string)=>
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + `/managers/${managerId}/customers`;

  /**
   * The OTP endpoint URL.
   */
  static readonly MAKE_CUSTOMER_PRIMARY =(customerId:string)=>
    ApiConstants.INITIAL + ApiConstants.VERSION(1) +  `/customers/${customerId}/primary`;


}
