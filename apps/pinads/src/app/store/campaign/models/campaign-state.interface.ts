import { BrandLocation, Brand } from '@pinads/shared/api/brand';
import {
  SuggestionBudgetObj,
  ProximityLocation,
} from '@pinads/shared/api/campaign';
import { KeywordPlaner } from '@pinads/shared/api/keyword-planer';

export interface CampaignState {
  headlines: string[];
  description: string[];
  brand: Brand | null;
  locations: BrandLocation[];
  keywords: string[];
  lang_code: string | null;
  budget: SuggestionBudgetObj | null;
  proximity: ProximityLocation | null;
  campaign_name: string | null;
  brandInfo: { website_url?: string; phone_number?: string };
  is_custom_budget: boolean;
  custom_budget: number | null;
  isKeywordChanged: boolean;
  keywordPlaner:KeywordPlaner[]
}
