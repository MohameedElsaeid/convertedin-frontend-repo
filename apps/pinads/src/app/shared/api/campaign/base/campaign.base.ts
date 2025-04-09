import { ApiResponse, MetaPayload } from '@pinads/shared/models';
import { Observable } from 'rxjs';
import {
  SuggestionBudget,
  SuggestionBudgetResponse,
  SuggestionDescription,
  SuggestionHeadline,
  SuggestionKeyword,
  SuggestionPayload,
} from '../models/interfaces/suggestions.interface';
import {
  CampaignPayload,
  CampaignResponse,
  GeneratePaymentLinkPayload,
} from '../models/interfaces/campaign.interface';
import { WorkingHour } from '../models/interfaces/working-hours.interface';
import {
  CampaignDetails,
  OptimizationLog,
  OptimizationLogResponse,
  UpdateCampaignPayload,
} from '../models';

export abstract class CampaignApi {
  /**
   * Retrieves suggestion keywords based on the provided payload.
   *
   * @param {string} brandId - The ID of the brand.
   * @param {SuggestionPayload} data - The payload for suggestion keywords.
   * @returns {Observable<ApiResponse<SuggestionKeyword>>} - An Observable that emits values of type `ApiResponse<SuggestionKeyword>`.
   */
  abstract getSuggestionsKeywords(
    brandId: string,
    data: SuggestionPayload
  ): Observable<ApiResponse<SuggestionKeyword>>;

  /**
   * Retrieves suggestion descriptions based on the provided payload.
   *
   * @param {string} brandId - The ID of the brand.
   * @param {SuggestionPayload} data - The payload for suggestion descriptions.
   * @returns {Observable<ApiResponse<SuggestionDescription>>} - An Observable that emits values of type `ApiResponse<SuggestionDescription>`.
   */
  abstract getSuggestionsDescriptions(
    brandId: string,
    data: SuggestionPayload
  ): Observable<ApiResponse<SuggestionDescription>>;

  /**
   * Retrieves suggestion headlines based on the provided payload.
   *
   * @param {string} brandId - The ID of the brand.
   * @param {SuggestionPayload} data - The payload for suggestion headlines.
   * @returns {Observable<ApiResponse<SuggestionHeadline>>} - An Observable that emits values of type `ApiResponse<SuggestionHeadline>`.
   */
  abstract getSuggestionsHeadlines(
    brandId: string,
    data: SuggestionPayload
  ): Observable<ApiResponse<SuggestionHeadline>>;

  /**
   * Retrieves suggestion budgets based on the provided payload.
   *
   * @param {string} brandId - The ID of the brand.
   * @param {SuggestionPayload} data - The payload for suggestion budgets.
   * @returns {Observable<ApiResponse<SuggestionBudgetResponse>>} - An Observable that emits values of type `ApiResponse<SuggestionBudget>`.
   */
  abstract getSuggestionsBudgets(
    brandId: string,
    data: SuggestionPayload
  ): Observable<ApiResponse<SuggestionBudgetResponse>>;

  /**
   * Creates a campaign based on the provided payload.
   * @param {CampaignPayload} campaign - The payload for creating a campaign.
   * @returns {Observable<ApiResponse<CampaignResponse>>} - An Observable that emits values of type ApiResponse<CampaignResponse>.
   */
  abstract createCampaign(
    campaign: CampaignPayload
  ): Observable<ApiResponse<CampaignResponse>>;

  /**
   * Retrieves working hours for a specific brand.
   *
   * @param {string} brandId - The ID of the brand.
   * @returns {Observable<ApiResponse<WorkingHour[]>>} - An Observable that emits values of type `ApiResponse<WorkingHour[]>`.
   */

  abstract getWorkingHours(
    brandId: string
  ): Observable<ApiResponse<WorkingHour[]>>;

  /**
   * Retrieves all campaigns with pagination.
   *
   * @param {MetaPayload} metaPayload - metaPayload.
   * @param {number} page - Page number.
   * @returns {Observable<ApiResponse<any>>} - An Observable that emits values of type `ApiResponse<any>`.
   */
  abstract getAllCampaigns(
    metaPayload: MetaPayload
  ): Observable<ApiResponse<any>>;

  /**
   * Generates a payment link based on the provided data.
   *
   * @param {string} campaignId - Campaign Id.
   * @param {GeneratePaymentLinkPayload} data - Data required to generate the payment link.
   * @returns {Observable<ApiResponse<{ payment_link: string }>>} - An Observable that emits values of type `ApiResponse<{ payment_link: string }`.
   */
  abstract generatePaymentLink(
    campaignId: string,
    data: GeneratePaymentLinkPayload
  ): Observable<ApiResponse<{ payment_link: string }>>;

  /**
   * Retrieves the details of a specific campaign.
   *
   * @param {string} id - The id of the campaign.
   * @returns {Observable<ApiResponse<CampaignDetails>>} - An Observable that emits values of type `ApiResponse<CampaignDetails>`.
   */
  abstract getCampaignDetails(
    id: string
  ): Observable<ApiResponse<CampaignDetails>>;

  /**
   * Updates a specific campaign with the provided payload.
   *
   * @param {number} campaignId - The id of the campaign to update.
   * @param {UpdateCampaignPayload} updateCampaignPayload - The payload containing the updates for the campaign.
   * @returns {Observable<any>} - An Observable that emits any type, representing the result of the update operation.
   */
  abstract updateCampaign(
    campaignId: number,
    updateCampaignPayload: UpdateCampaignPayload
  ): Observable<any>;

  abstract getPinadsSuggestions(
    brandId: string,
    data: SuggestionPayload
  ): Observable<ApiResponse<any>>;

  abstract getOptimizationLogs(
    id: string,
    metaPayload: MetaPayload
  ): Observable<ApiResponse<OptimizationLogResponse>>;
}
