import { Observable } from 'rxjs';
import { CustomerAccount, ManagerAccount } from '../models';
import { ApiResponse } from '@pinads/shared/models';

export abstract class AccountsApi {
  /**
   * Retrieves a list of manager accounts.
   *
   * @return {Observable<ApiResponse<ManagerAccount[]>>} An Observable that emits values of type `ApiResponse<ManagerAccount[]>`.
   */
  abstract getManagerList(): Observable<ApiResponse<ManagerAccount[]>>;

  /**
   * Sets the current manager account as the primary account.
   *
   * @param {string} managerId - The ID of the manager account.
   * @return {Observable<ApiResponse<null>>} An Observable that emits values of type `ApiResponse<null>`.
   */
  abstract makeManagerPrimary(managerId: string): Observable<ApiResponse<null>>;

  /**
   * Retrieves a list of customer accounts.
   *
   * @param {string} managerId - The ID of the manager account.
   * @return {Observable<ApiResponse<CustomerAccount[]>>} An Observable that emits values of type `ApiResponse<CustomerAccount[]>`.
   */
  abstract getCustomerList(
    managerId: string
  ): Observable<ApiResponse<CustomerAccount[]>>;

  /**
   * Sets the current customer account as the primary account.
   *
   * @param {string} customerId - The ID of the customer account.
   * @return {Observable<ApiResponse<null>>} An Observable that emits values of type `ApiResponse<null>`.
   */
  abstract makeCustomerPrimary(
    customerId: string
  ): Observable<ApiResponse<null>>;
}
