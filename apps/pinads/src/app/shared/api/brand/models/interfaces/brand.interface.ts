export interface Brand {
  id: string;
  user_id: number;
  resource_id: string;
  name: string;
  type: string;
  verification_state: string;
  vetted_state: string;
  website_url: string;
  phone: string;
  profile_location_id: string;
}

export interface UpdateBrandPayload {
  phone: string;
  profile_location_id: string;
}
