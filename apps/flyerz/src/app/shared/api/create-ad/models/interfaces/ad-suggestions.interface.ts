import { SuggestionItem } from './suggestion-item.interface';

export interface AdSuggestions {
  objective: string;
  targeting: {
    countries: Array<string> | string | null;
    areas: Array<string>;
    cities: Array<string>;
  };
  minimumAge: number;
  maximumAge: number;
  gender: Array<string>;
  interests: Array<Suggestion | SuggestionItem>;
  behaviors: Array<Suggestion | SuggestionItem>;
  demographics: Array<Suggestion | SuggestionItem>;
}

export interface Suggestion {
  id: number;
  name: string;
}
