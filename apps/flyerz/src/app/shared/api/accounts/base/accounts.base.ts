import { Observable } from 'rxjs';
import {
  Category,
  ConnectionDetails,
  SocialMediaChannel,
  SocialMediaPage,
} from '../models/interfaces';

export abstract class AccountsApi {
  /**
   * Reassigns user facebook account
   */
  abstract reassignAccount(): Observable<any>;

  /**
   * Refreshes the token for connected facebook account (use only in case token expires)
   * @param facebookAccessToken New token to be updated
   */
  abstract refreshFacebookToken(facebookAccessToken: string): Observable<any>;

  /**
   * Updates facebook pae for current logged in user
   * @param categoryId Category ID of new page
   * @param facebookPageId ID of new page to be changed
   */
  abstract updateFacebookPage(
    categoryId: number,
    facebookPageId: string
  ): Observable<any>;

  /**
   * Gets social media channels for current account
   */
  abstract getSocialMediaChannels(): Observable<{
    data: { channels: Array<SocialMediaChannel> };
  }>;

  /**
   * Gets list of post categories
   */
  abstract getCategories(): Observable<{ data: Array<Category> }>;

  /**
   * Gets list of pages for current account
   * @param facebookAccessToken Provided only if account is being connected for first time
   */
  abstract getFacebookPages(
    facebookAccessToken?: string
  ): Observable<{ data: Array<SocialMediaPage> }>;

  /**
   * Connect account to social media channel
   * @param categoryId Id of selected category
   * @param channelId Id of selected channel
   * @param facebookAccessToken Access token for facebook account
   * @param facebookPageId Id of selected facebook page
   */
  abstract connectToSocialMedia(
    facebookPageId: string,
    channelId: number,
    categoryId?: string | number,
    facebookAccessToken?: string
  ): Observable<any>;

  /**
   * Gets current account connection status for social media channels
   */
  abstract getConnectionDetails(): Observable<{ data: ConnectionDetails }>;
}
