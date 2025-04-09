import { Injectable } from '@angular/core';
import { AdsApi } from '../base/ads.base';
import { QueryApi } from '@convertedin/api';
import { Observable } from 'rxjs';
import {
  Ad,
  AdDetails,
  AdFinishReason,
  AdLeads,
  Insights,
} from '../models/interfaces';
import { AdsEndpoints } from '../constants/ads.constant';

@Injectable()
export class AdsApiService extends AdsApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override getAdLeads(adId: number, next?: string): Observable<AdLeads> {
    return this.__queryApi.get(AdsEndpoints.GET_LEADS(adId), {
      params: next ? { next } : {},
    });
  }

  override getAdDetails(adId: number): Observable<{ data: AdDetails }> {
    return this.__queryApi.get(AdsEndpoints.GET_AD_DETAILS + `/${adId}`);
  }

  override updateAdBudgetAndDuration(
    budget: number,
    days: number,
    adId: number
  ): Observable<any> {
    return this.__queryApi.update(AdsEndpoints.UPDATE_BUDGET_DURATION, {
      budget,
      days,
      adId,
    });
  }

  override finishAd(
    id: string | number,
    reasonId: string | number,
    reasonMessage?: string | undefined
  ): Observable<any> {
    return this.__queryApi.post(AdsEndpoints.FINISH_AD, {
      id,
      reasonId,
      reasonMessage,
    });
  }

  override getAdFinishReasons(): Observable<{ data: AdFinishReason[] }> {
    return this.__queryApi.get(AdsEndpoints.GET_FINISH_AD_REASONS);
  }

  override getInsights(): Observable<{ data: Insights }> {
    return this.__queryApi.get(AdsEndpoints.INSIGHTS);
  }

  override getAds(
    offset: number | string,
    status: number | string,
    limit: number | string
  ): Observable<{ data: Ad[] }> {
    return this.__queryApi.get(AdsEndpoints.GET_ADS, {
      params: {
        offset,
        status,
        limit,
      },
    });
  }
}
