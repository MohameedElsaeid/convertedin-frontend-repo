import { BudgetType } from '../types/suggestion-budget.type';
import { ProximityLocation } from './location.interface';

export interface SuggestionKeyword {
  keywords: string[];
}

export interface SuggestionHeadline {
  headlines: string[];
}
export interface SuggestionDescription {
  descriptions: string[];
}

export interface SuggestionBudgetResponse {
  budgets: SuggestionBudget;
  profit_share: number;
  monthly_fees: number;
}

export interface SuggestionBudget {
  low: SuggestionBudgetObj;
  recommended: SuggestionBudgetObj;
  high: SuggestionBudgetObj;
}

export interface SuggestionBudgetObj {
  type?: BudgetType;
  monthly_amount_micros: number;
  monthly_amount: string;
  min_monthly_clicks: number;
  max_monthly_clicks: number;
}

export interface SuggestionPayload {
  locations?: string[];
  keywords?: string[];
  lang_code: string;
  proximity: ProximityLocation;
  profile_location_id: string;
  website_url?: string;
  phone_number?: string;
}
