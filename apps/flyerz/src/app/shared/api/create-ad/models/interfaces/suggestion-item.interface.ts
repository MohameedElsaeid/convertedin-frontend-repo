import { Suggestion } from './ad-suggestions.interface';

export interface SuggestionItem extends Suggestion {
  audienceSize: number;
  isSelected: boolean;
}
