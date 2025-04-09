import { CountryItem, MatchAdSuggestions } from '../interfaces';

export const createMatchAdSuggestions: (
  days: number,
  country: CountryItem,
  minimumBudget: {
    amount: number;
    currency: {
      id: number;
      name: string;
      symbol: string;
    };
  }
) => MatchAdSuggestions = (
  days: number,
  country: CountryItem,
  minimumBudget: {
    amount: number;
    currency: {
      id: number;
      name: string;
      symbol: string;
    };
  }
) => ({
  areas: [],
  behaviors: [],
  cities: [],
  countries: [country],
  days,
  demographics: [],
  gender: 'both',
  interests: [],
  minimumBudget,
});
