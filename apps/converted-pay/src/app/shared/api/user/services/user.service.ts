import { Injectable } from '@angular/core';
import { QueryApi } from '@convertedin/api';
import { UserApi } from '../base/user.base';
import { ApiResponse } from '@converted-pay/shared/models/interfaces';
import { Observable } from 'rxjs';
import {
  ProfilePayload,
  ProfileResponse,
  ReferralParams,
  ReferralResponse,
  ReferralTransactions,
  UploadTaxResponse,
} from '../models';
import { UserEndpoints } from '../constants/user.constants';
import { UserData } from '../../auth';

@Injectable()
export class UserApiService extends UserApi {
  constructor(private __query: QueryApi) {
    super();
  }

  override getReferrals(
    params: ReferralParams
  ): Observable<ApiResponse<ReferralResponse>> {
    return this.__query.get(UserEndpoints.GET_REFERRALS, {
      params: { ...params },
    });
  }
  override getReferralTransactions(): Observable<
    ApiResponse<ReferralTransactions>
  > {
    return this.__query.get(UserEndpoints.GET_REFERRALS_TRANSACTIONS);
  }
  override getProfile(): Observable<ApiResponse<ProfileResponse>> {
    return this.__query.get(UserEndpoints.GET_PROFILE);
  }
  override updateProfile(
    data: ProfilePayload
  ): Observable<ApiResponse<UserData>> {
    return this.__query.patch(UserEndpoints.UPDATE_PROFILE, data);
  }

  override uploadTaxImage(data: FormData): Observable<ApiResponse<UserData>> {
    return this.__query.post(UserEndpoints.UPLOAD_TAX, data);
  }
  override getFAQ(): Observable<ApiResponse<any>> {
    return this.__query.get(UserEndpoints.FAQ);
  }
}
