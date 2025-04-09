import { QueryApi } from '@convertedin/api';
import { SocialAccountsApi } from '../base/social-accounts.base';
import { Observable } from 'rxjs';
import { SocialAccountsEndpoints } from '../constants/social-accounts.constant';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@converted-pay/shared/models/interfaces';
import {
  GoogleBusiness,
  GoogleBusinessPayload,
  MetaBusiness,
  SocialAccount,
  UserBusiness,
} from '../models/interfaces';
import { ConnectedAccount } from '../../auth';

@Injectable()
export class SocialAccountsApiService extends SocialAccountsApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override getSocialAccounts(): Observable<ApiResponse<Array<SocialAccount>>> {
    return this.__queryApi.get(SocialAccountsEndpoints.GET_SOCIAL_ACCOUNTS);
  }

  override getBusinesses(
    accessToken: string,
    socialPlatform: number
  ): Observable<ApiResponse<Array<UserBusiness>>> {
    return this.__queryApi.get(SocialAccountsEndpoints.GET_USER_BUSINESSES, {
      params: {
        accessToken,
        socialPlatform,
      },
    });
  }

  override connectSocialAccount(
    accessToken: string,
    platformId: string,
    businessName: string,
    businessId: string
  ): Observable<any> {
    return this.__queryApi.post(
      SocialAccountsEndpoints.CONNECT_SOCIAL_ACCOUNT,
      {
        accessToken,
        platformId,
        businessId,
        businessName,
      }
    );
  }

  override getGoogleBusinesses(
    accessToken: string
  ): Observable<ApiResponse<GoogleBusiness[]>> {
    return this.__queryApi.get(SocialAccountsEndpoints.GET_Google_BUSINESSES, {
      params: { accessToken },
    });
  }

  override getMetaBusinesses(
    accessToken: string
  ): Observable<ApiResponse<MetaBusiness[]>> {
    return this.__queryApi.get(SocialAccountsEndpoints.GET_Meta_BUSINESSES, {
      params: { accessToken },
    });
  }

  override connectMetaAccount(token: string): Observable<any> {
    return this.__queryApi.post(SocialAccountsEndpoints.CONNECT_META_ACCOUNT, {
      facebookAccessToken: token,
    });
  }
  override connectGoogleAccount(
    googlePayload: GoogleBusinessPayload
  ): Observable<any> {
    return this.__queryApi.post(
      SocialAccountsEndpoints.CONNECT_GOOGLE_ACCOUNT,
      googlePayload
    );
  }

  override getUserConnectedAccounts(): Observable<
    ApiResponse<ConnectedAccount[]>
  > {
    return this.__queryApi.get(SocialAccountsEndpoints.GET_CONNECTED_ACCOUNTS);
  }

  override disconnectAccount(
    connectedAccountId: string
  ): Observable<ApiResponse<any>> {
    return this.__queryApi.delete(
      SocialAccountsEndpoints.DELETE_CONNECTED_ACCOUNT,
      { body: { connectedAccountId } }
    );
  }
  override addToPlatformWaitList(socialAccountPlatFormId: number): Observable<any> {
    return this.__queryApi.post(
      SocialAccountsEndpoints.ADD_TO_PLATFORM_WAIT_LIST,
      {socialAccountPlatFormId}
    );
  }
}
