export interface CampaignDetails {
  id: number;
  brand_id: number;
  name: string;
  status: 'ENABLED' | 'DISABLED' | 'PAUSED' |'LEARNING'; // Assuming other possible statuses could be present
  budget_micros: number;
  keywords: string[];
  headlines: string[];
  descriptions: string[];
  schedules: any;
  proximity: Proximity;
  locations: Location[];
  impressions: number;
  clicks: number;
  local_actions: number;
  call_clicks: number;
  first_time_subscriber: boolean;
}

interface PostalAddress {
  locality: string;
  postalCode: string;
  regionCode: string;
  addressLines: string[];
  languageCode: string;
  administrativeArea: string;
}

interface Location {
  id: number;
  brand_id: number;
  resource_id: string;
  title: string;
  website_url: string;
  postal_address: PostalAddress;
  geo_address: any[]; // Replace `any` with the actual type if known
  phone_number: string;
}

interface Proximity {
  radius: number;
  radius_units: 'KILOMETERS' | 'MILES'; // Assuming radius units can be either kilometers or miles
  latitude_in_micro_degrees: number;
  longitude_in_micro_degrees: number;
}
