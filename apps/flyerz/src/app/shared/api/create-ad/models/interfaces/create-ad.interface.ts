export interface CreateAd {
  budget: number;
  goal_id: string | number;
  channel_id: string | number;
  post_id?: string | number;
  days: number;
  message: string;
  maxAge: number;
  minAge: number;
  gender: string;
  areas: Array<number>;
  cities: Array<number>;
  countryId: string | number;
  type?: 2;
  images: Array<string>;
  interests: Array<number>;
  behaviours: Array<number>;
  instagram_post_id?: string;
  demographics: Array<number>;
}
