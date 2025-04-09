export interface KeywordPlanerPayload {
  language: string;
  keywords: string[];
  next_page_token: string | null;
  country: string;
  page_size?: number;
  is_provided?: boolean;
}
export interface KeywordPlaner {
  keyword: string;
  avg_monthly_searches: number;
  competition: string;
  low_top_of_page_bid: string;
  high_top_of_page_bid: string;
  three_month_change: string;
  yoy_change: string;
  is_provided: boolean;
  three_month_change_is_positive?: boolean;
  volume?: string;
}

export interface KeywordPlanerResponse {
  keywords: KeywordPlaner[];
  next_page_token: string;
}
