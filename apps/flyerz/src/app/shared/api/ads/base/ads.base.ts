import { Observable } from 'rxjs';
import {
  Ad,
  AdDetails,
  AdFinishReason,
  AdLeads,
  Insights,
} from '../models/interfaces';

export abstract class AdsApi {
  /**
   * Gets a list of ad leads
   * @param adId Ad id to get leads for
   * @param next Next set of items pagination query
   */
  abstract getAdLeads(adId: number, next?: string): Observable<AdLeads>;

  /**
   * Updates currently active ad with new budget & duration
   * @param budget New ad budget
   * @param days New ad duration
   * @param adId Ad id to be updated
   */
  abstract updateAdBudgetAndDuration(
    budget: number,
    days: number,
    adId: number
  ): Observable<any>;

  /**
   * Gets details for provided ad Id
   * @param adId Id of ad to get details for
   */
  abstract getAdDetails(adId: number): Observable<{ data: AdDetails }>;

  /**
   * Finishes Ad
   * @param id Id of ad to be finished
   * @param reasonId Id of ad finish reason
   * @param reasonMessage Ad finish reason message
   */
  abstract finishAd(
    id: number | string,
    reasonId: number | string,
    reasonMessage?: string
  ): Observable<any>;

  /**
   * Returns list of finish ad reason
   */
  abstract getAdFinishReasons(): Observable<{ data: Array<AdFinishReason> }>;

  /**
   * Gets insights for dashboard
   */
  abstract getInsights(): Observable<{ data: Insights }>;

  /**
   * Gets list of created ads
   * @param offset Data offset
   * @param status Filter by ad status
   * @param limit Max number of objects
   */
  abstract getAds(
    offset: number | string,
    status: number | string,
    limit: number | string
  ): Observable<{ data: Array<Ad> }>;
}
