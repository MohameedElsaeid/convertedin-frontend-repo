import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CampaignActionTypes } from '../models/campaign.action.enum';
import { Brand, BrandLocation } from '@pinads/shared/api/brand';
import {
  SuggestionBudget,
  SuggestionBudgetObj,
  ProximityLocation,
} from '@pinads/shared/api/campaign';
import { KeywordPlaner } from '@pinads/shared/api/keyword-planer';

export const CampaignActions = createActionGroup({
  source: 'Campaign',
  events: {
    [CampaignActionTypes.GET_BRAND_LIST]: props<{
      brandList: Brand[];
    }>(),

    [CampaignActionTypes.GET_BRAND_LOCATION_LIST]: props<{
      brandLocationList: BrandLocation[];
    }>(),
    [CampaignActionTypes.GET_BUDGETS]: props<{
      budgets: SuggestionBudget;
    }>(),

    [CampaignActionTypes.SET_BRAND]: props<{
      brand: Brand;
    }>(),
    [CampaignActionTypes.SET_LOCATIONS]: props<{
      locations: BrandLocation[];
    }>(),
    [CampaignActionTypes.SET_BRANCH_INFO]: props<{
      brandInfo: { website_url: string; phone_number: string };
    }>(),
    [CampaignActionTypes.RESET_CAMPAIGN_STATE]: emptyProps(),
    [CampaignActionTypes.SET_TARGET_FORM]: props<{
      keywords: string[];
      lang_code: string;
      proximity: ProximityLocation;
      campaign_name: string;
    }>(),
    [CampaignActionTypes.SET_AD_CAMPAIGN_FORM]: props<{
      headlines: string[];
      description: string[];
    }>(),
    [CampaignActionTypes.SET_BUDGET]: props<{
      budget: SuggestionBudgetObj;
    }>(),
    [CampaignActionTypes.SET_CUSTOM_BUDGET]: props<{
      custom_budget: number;
    }>(),
    [CampaignActionTypes.SET_PROXIMITY]: props<{
      proximity: ProximityLocation;
    }>(),
    [CampaignActionTypes.SET_KEYWORD_PLANNER]: props<{
      keywordPlaner: KeywordPlaner[];
    }>(),
  },
});
