import { ApiConstants } from "@super-admin/shared/constants/api/api.constant";

export class AuthEndpoints {
  /**
   * The login endpoint URL.
   */
  static readonly LOGIN =
    ApiConstants.INITIAL  + '/auth/login';

  /**
   * The logout endpoint URL.
   */
  static readonly LOGOUT =
    ApiConstants.INITIAL  + '/auth/logout';


}
