import { Observable } from 'rxjs';
import {
  ProfilePayload,
  ProfileResponse,
  ReferralParams,
  ReferralResponse,
  ReferralTransactions,
  UploadTaxResponse,
} from '../models';
import { ApiResponse } from '@converted-pay/shared/models/interfaces';
import { UserData } from '../../auth';

export abstract class UserApi {
  abstract getReferrals(
    params: ReferralParams
  ): Observable<ApiResponse<ReferralResponse>>;

  abstract getReferralTransactions(): Observable<
    ApiResponse<ReferralTransactions>
  >;
  abstract getProfile(): Observable<ApiResponse<ProfileResponse>>;

  abstract updateProfile(
    data: ProfilePayload
  ): Observable<ApiResponse<UserData>>;

  abstract uploadTaxImage(data: FormData): Observable<ApiResponse<UserData>>;

  abstract getFAQ(): Observable<ApiResponse<any>>;
}
