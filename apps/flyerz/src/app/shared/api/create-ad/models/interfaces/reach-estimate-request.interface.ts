export interface ReachEstimateRequest {
  country: string;
  cities: Array<string | number>;
  areas: Array<string | number>;
  interests: Array<string | number>;
  demographics: Array<string | number>;
  behaviors: Array<string | number>;
  gender: string;
}
