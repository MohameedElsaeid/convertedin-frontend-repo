import { Injectable } from '@angular/core';
import { CampaignApi } from '../base/campaign.base';
import { QueryApi } from '@convertedin/api';
import { ApiResponse, MetaPayload } from '@pinads/shared/models';
import { Observable } from 'rxjs';
import {
  SuggestionPayload,
  SuggestionKeyword,
  SuggestionDescription,
  SuggestionHeadline,
  SuggestionBudgetResponse,
} from '../models/interfaces/suggestions.interface';
import { SuggestionEndpoints } from '../constants/suggestions.constants';
import {
  CampaignPayload,
  CampaignResponse,
  GeneratePaymentLinkPayload,
} from '../models/interfaces/campaign.interface';
import { CampaignEndpoints } from '../constants/campaign.constants';
import { WorkingHour } from '../models/interfaces/working-hours.interface';
import { WorkingHoursEndpoints } from '../constants/working-hours.constants';
import { HttpParams } from '@angular/common/http';
import {
  CampaignDetails,
  OptimizationLogResponse,
  UpdateCampaignPayload,
} from '../models';

@Injectable()
export class CampaignService extends CampaignApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }
  override getSuggestionsKeywords(
    brandId: string,
    data: SuggestionPayload
  ): Observable<ApiResponse<SuggestionKeyword>> {
    return this.__queryApi.post(
      SuggestionEndpoints.GET_KEYWORDS(brandId),
      data
    );
  }
  override getSuggestionsDescriptions(
    brandId: string,
    data: SuggestionPayload
  ): Observable<ApiResponse<SuggestionDescription>> {
    return this.__queryApi.post(
      SuggestionEndpoints.GET_DESCRIPTIONS(brandId),
      data
    );
  }
  override getSuggestionsHeadlines(
    brandId: string,
    data: SuggestionPayload
  ): Observable<ApiResponse<SuggestionHeadline>> {
    return this.__queryApi.post(
      SuggestionEndpoints.GET_HEADLINES(brandId),
      data
    );
  }
  override getSuggestionsBudgets(
    brandId: string,
    data: SuggestionPayload
  ): Observable<ApiResponse<SuggestionBudgetResponse>> {
    return this.__queryApi.post(SuggestionEndpoints.GET_BUDGETS(brandId), data);
  }
  override createCampaign(
    data: CampaignPayload
  ): Observable<ApiResponse<CampaignResponse>> {
    return this.__queryApi.post(CampaignEndpoints.CREATE_CAMPAIGN, data);
  }

  override getWorkingHours(
    brandId: string
  ): Observable<ApiResponse<WorkingHour[]>> {
    return this.__queryApi.get(
      WorkingHoursEndpoints.GET_WORKING_HOURS(brandId)
    );
  }

  override getAllCampaigns(
    metaPayload: MetaPayload
  ): Observable<ApiResponse<any>> {
    const params = new HttpParams({
      fromObject: metaPayload as any,
    });
    return this.__queryApi.get(CampaignEndpoints.GET_ALL_CAMPAIGNS, { params });
  }

  override generatePaymentLink(
    campaignId: string,
    data: GeneratePaymentLinkPayload
  ): Observable<ApiResponse<{ payment_link: string }>> {
    return this.__queryApi.post(
      CampaignEndpoints.GENERATE_PAYMENT_LINK(campaignId),
      data
    );
  }

  override getCampaignDetails(
    id: string
  ): Observable<ApiResponse<CampaignDetails>> {
    return this.__queryApi.get(CampaignEndpoints.GET_CAMPAIGN_DETAILS(id));
  }

  override updateCampaign(
    campaignId: number,
    updateCampaignPayload: UpdateCampaignPayload
  ): Observable<any> {
    return this.__queryApi.post(
      CampaignEndpoints.UPDATE_CAMPAIGN(campaignId.toString()),
      updateCampaignPayload
    );
  }

  override getPinadsSuggestions(
    brandId: string,
    data: SuggestionPayload
  ): Observable<ApiResponse<any>> {
    return this.__queryApi.post(
      SuggestionEndpoints.GET_PINADS_SUGGESTIONS(brandId),
      data
    );
  }

  override getOptimizationLogs(
    id: string,
    metaPayload: MetaPayload
  ): Observable<ApiResponse<OptimizationLogResponse>> {
    const params = new HttpParams({
      fromObject: metaPayload as any,
    });
    return this.__queryApi.get(CampaignEndpoints.GET_OPTIMIZATION_LOG(id), {
      params,
    });
  }
}
