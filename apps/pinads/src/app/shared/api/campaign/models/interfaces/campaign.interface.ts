export interface CampaignPayload {
  campaign_name: string;
  brand_id: number;
  budget_micros?: number;
  locations: string[];
  keywords: string[];
  headlines: string[];
  descriptions: string[];
  lang_code: string;
  proximity: {
    latitude_in_micro_degrees: number;
    longitude_in_micro_degrees: number;
    radius: number;
    radius_units: 'KILOMETERS' | 'MILES';
  };
  profile_location_id: string;
  website_url?: string;
  phone_number?: string;
  is_custom_budget:boolean;
  custom_budget_micros?:number;
  // payment_success_redirect_url: string;
  // payment_failure_redirect_url: string;
}

export interface CampaignResponse {
  campaign: CampaignPayload;
  payment_link: string;
}



export interface GeneratePaymentLinkPayload {
  payment_success_redirect_url: string;
  payment_failure_redirect_url: string;
}
