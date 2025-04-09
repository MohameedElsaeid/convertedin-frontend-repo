import { ApiResponse } from '@converted-pay/shared/models/interfaces';
import { Observable } from 'rxjs';
import {
  GoogleBusiness,
  GoogleBusinessPayload,
  MetaBusiness,
  SocialAccount,
  UserBusiness,
} from '../models/interfaces';
import { ConnectedAccount } from '../../auth';

export abstract class SocialAccountsApi {
  abstract getSocialAccounts(): Observable<ApiResponse<Array<SocialAccount>>>;

  abstract getBusinesses(
    accessToken: string,
    socialPlatform: number
  ): Observable<ApiResponse<Array<UserBusiness>>>;

  abstract getGoogleBusinesses(
    accessToken: string
  ): Observable<ApiResponse<GoogleBusiness[]>>;

  abstract getMetaBusinesses(
    accessToken: string
  ): Observable<ApiResponse<MetaBusiness[]>>;

  abstract connectSocialAccount(
    accessToken: string,
    platformId: string,
    businessName: string,
    businessId: string
  ): Observable<any>;

  abstract connectMetaAccount(token: string): Observable<any>;
  abstract connectGoogleAccount(
    googlePayload: GoogleBusinessPayload
  ): Observable<any>;

  abstract getUserConnectedAccounts(): Observable<
    ApiResponse<ConnectedAccount[]>
  >;

  abstract disconnectAccount(
    connectedAccountId: string
  ): Observable<ApiResponse<any>>;

  abstract addToPlatformWaitList(platformId: number): Observable<any>;
}
