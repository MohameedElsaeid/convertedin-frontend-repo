import { QueryApi } from '@convertedin/api';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerAccount, ManagerAccount } from '../models';
import { ApiResponse } from '@pinads/shared/models/interfaces/api.interface';
import { AccountsEndpoints } from '../constants';
import { AccountsApi } from '../base';

@Injectable()
export class AccountsService extends AccountsApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }
  override getManagerList(): Observable<ApiResponse<ManagerAccount[]>> {
    return this.__queryApi.get(AccountsEndpoints.GET_MANAGER_LIST);
  }
  override makeManagerPrimary(
    managerId: string
  ): Observable<ApiResponse<null>> {
    return this.__queryApi.post(
      AccountsEndpoints.MAKE_MANAGER_PRIMARY(managerId),{}
    );
  }
  override getCustomerList(
    managerId: string
  ): Observable<ApiResponse<CustomerAccount[]>> {
    return this.__queryApi.get(AccountsEndpoints.GET_CUSTOMER_LIST(managerId));
  }
  override makeCustomerPrimary(
    customerId: string
  ): Observable<ApiResponse<null>> {
    return this.__queryApi.post(
      AccountsEndpoints.MAKE_CUSTOMER_PRIMARY(customerId),{}
    );
  }
}
