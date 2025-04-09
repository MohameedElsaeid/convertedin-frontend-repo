export interface MatchSuggestions {
  objective: string;
  countries: Array<string> | null;
  areas: Array<string>;
  cities: Array<string>;
  minimumAge: number;
  maximumAge: number;
  gender: Array<string>;
  interests: Array<string>;
  behaviors: Array<string>;
  demographics: Array<string>;
}
