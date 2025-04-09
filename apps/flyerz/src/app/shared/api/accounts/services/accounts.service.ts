import { QueryApi } from '@convertedin/api';
import { AccountsApi } from '../base/accounts.base';
import { Observable } from 'rxjs';
import {
  Category,
  ConnectionDetails,
  SocialMediaChannel,
  SocialMediaPage,
} from '../models/interfaces';
import { AccountsEndpoints } from '../constants/accounts.constant';
import { Injectable } from '@angular/core';

@Injectable()
export class AccountsApiService extends AccountsApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override reassignAccount(): Observable<any> {
    return this.__queryApi.post(AccountsEndpoints.REASSIGN_ACCOUNT, {});
  }

  override refreshFacebookToken(facebookAccessToken: string): Observable<any> {
    return this.__queryApi.post(AccountsEndpoints.REFRESH_FB_TOKEN, {
      facebookAccessToken,
    });
  }

  override updateFacebookPage(
    categoryId: number,
    facebookPageId: string
  ): Observable<any> {
    return this.__queryApi.update(AccountsEndpoints.FACEBOOK_PAGES, {
      categoryId,
      facebookPageId,
    });
  }

  override getSocialMediaChannels(): Observable<{
    data: { channels: SocialMediaChannel[] };
  }> {
    return this.__queryApi.get(AccountsEndpoints.GET_SOCIAL_MEDIA_CHANNELS);
  }

  override getCategories(): Observable<{ data: Category[] }> {
    return this.__queryApi.get(AccountsEndpoints.GET_CATEGORIES);
  }

  override getFacebookPages(
    facebookAccessToken?: string | undefined
  ): Observable<{ data: SocialMediaPage[] }> {
    const params = facebookAccessToken
      ? {
          params: {
            facebookAccessToken,
          },
        }
      : {};

    return this.__queryApi.get(AccountsEndpoints.FACEBOOK_PAGES, params);
  }

  override connectToSocialMedia(
    facebookPageId: string,
    channelId: number,
    categoryId?: string | number,
    facebookAccessToken?: string
  ): Observable<any> {
    return this.__queryApi.post(AccountsEndpoints.CONNECT_SOCIAL_MEDIA, {
      channelId,
      facebookAccessToken,
      facebookPageId,
      categoryId,
    });
  }

  override getConnectionDetails(): Observable<{ data: ConnectionDetails }> {
    return this.__queryApi.get(AccountsEndpoints.GET_CONNECTION_DETAILS);
  }
}
