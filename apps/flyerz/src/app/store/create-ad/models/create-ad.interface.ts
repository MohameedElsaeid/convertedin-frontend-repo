import {
  AdGoal,
  AdSuggestions,
  CountryItem,
  CreateAdChannel,
  MatchAdSuggestions,
  Post,
} from '@flyerz/shared/api';

export interface CreateAdState {
  channel: CreateAdChannel | undefined;
  post: Post | undefined;
  goal: AdGoal | undefined;
  adSuggestions: MatchAdSuggestions | undefined;
  aiSuggestions: AdSuggestions | undefined;
  country: CountryItem | undefined;
}
