import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateAdActionTypes } from '../models/create-ad.enum';
import {
  AdGoal,
  AdSuggestions,
  CountryItem,
  CreateAdChannel,
  LocationItem,
  MatchAdSuggestions,
  Post,
  SuggestionItem,
} from '@flyerz/shared/api';

export const CreateAdActions = createActionGroup({
  source: 'Create Ad',
  events: {
    [CreateAdActionTypes.SET_CHANNEL]: props<{
      channel: CreateAdChannel;
    }>(),

    [CreateAdActionTypes.SET_POST]: props<{ post: Post }>(),

    [CreateAdActionTypes.SET_GOAL]: props<{ goal: AdGoal }>(),

    [CreateAdActionTypes.SET_AD_SUGGESTIONS]: props<{
      suggestions: MatchAdSuggestions;
    }>(),

    [CreateAdActionTypes.SET_AI_SUGGESTIONS]: props<{
      suggestions: AdSuggestions;
    }>(),

    [CreateAdActionTypes.DELETE_INTEREST]: props<{ id: number }>(),

    [CreateAdActionTypes.DELETE_BEHAVIOUR]: props<{ id: number }>(),

    [CreateAdActionTypes.DELETE_DEMOGRAPHIC]: props<{ id: number }>(),

    [CreateAdActionTypes.SET_INTERESTS]: props<{ items: SuggestionItem[] }>(),

    [CreateAdActionTypes.SET_DEMOGRAPHICS]: props<{
      items: SuggestionItem[];
    }>(),

    [CreateAdActionTypes.SET_BEHAVIOURS]: props<{ items: SuggestionItem[] }>(),

    [CreateAdActionTypes.ADD_INTEREST]: props<{ item: SuggestionItem }>(),

    [CreateAdActionTypes.ADD_DEMOGRAPHIC]: props<{ item: SuggestionItem }>(),

    [CreateAdActionTypes.ADD_BEHAVIOUR]: props<{ item: SuggestionItem }>(),

    [CreateAdActionTypes.UPDATE_BUDGET_DURATION]: props<{
      budget: number;
      duration: number;
    }>(),

    [CreateAdActionTypes.UPDATE_AUDIANCE_AGE]: props<{
      minimumAge: number;
      maximumAge: number;
    }>(),

    [CreateAdActionTypes.UPDATE_AUDIANCE_GENDER]: props<{
      gender: string;
    }>(),

    [CreateAdActionTypes.SET_CITIES]: props<{ cities: Array<LocationItem> }>(),

    [CreateAdActionTypes.SET_AREAS]: props<{ areas: Array<LocationItem> }>(),

    [CreateAdActionTypes.ADD_COUNTRY]: props<{ country: CountryItem }>(),

    [CreateAdActionTypes.ADD_CITY]: props<{ city: LocationItem }>(),

    [CreateAdActionTypes.ADD_AREA]: props<{ area: LocationItem }>(),

    [CreateAdActionTypes.DELETE_CITY]: props<{ cityId: number }>(),

    [CreateAdActionTypes.DELETE_AREA]: props<{ areaId: number }>(),

    [CreateAdActionTypes.RESET]: emptyProps(),
  },
});
