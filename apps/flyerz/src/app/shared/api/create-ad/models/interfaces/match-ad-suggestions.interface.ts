import { CountryItem } from './country-item.interface';
import { LocationItem } from './location-item.interface';
import { SuggestionItem } from './suggestion-item.interface';

export interface MatchAdSuggestions {
  days: number;
  minimumBudget: {
    amount: number;
    currency: {
      id: number;
      name: string;
      symbol: string;
    };
  };
  gender: string | Array<string>;
  countries: Array<CountryItem>;
  cities: Array<LocationItem>;
  areas: Array<LocationItem>;
  interests: Array<SuggestionItem>;
  behaviors: Array<SuggestionItem>;
  demographics: Array<SuggestionItem>;
}
