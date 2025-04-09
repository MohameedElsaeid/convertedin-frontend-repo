import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { CreateAdState } from '../models/create-ad.interface';
import { StoreKeys } from '@flyerz/store/store-keys.enum';
import { MatchAdSuggestions } from '@flyerz/shared/api';
import { createAdReducer } from '../reducer/create-ad.reducer';

const selectCreateAd = createFeatureSelector<CreateAdState>(
  StoreKeys.CREATE_AD
);

export const selectAdSuggestions = createSelector(selectCreateAd, (state) => ({
  data: state.adSuggestions as MatchAdSuggestions,
}));

export const selectAdGoal = createSelector(
  selectCreateAd,
  (state) => state.goal
);

export const selectAudiance = createSelector(selectCreateAd, (state) => ({
  minimumAge: state.aiSuggestions?.minimumAge,
  maximumAge: state.aiSuggestions?.maximumAge,
  gender: state.adSuggestions?.gender,
}));

export const selectAdSuggestionsInterests = createSelector(
  selectCreateAd,
  (state) => state.adSuggestions?.interests
);

export const selectAdSuggestionsDemographics = createSelector(
  selectCreateAd,
  (state) => state.adSuggestions?.demographics
);

export const selectAdSuggestionsBehaviours = createSelector(
  selectCreateAd,
  (state) => state.adSuggestions?.behaviors
);

export const selectAllCreateAd = createSelector(
  selectCreateAd,
  (state) => state
);

export const selectCities = createSelector(selectCreateAd, (state) => ({
  cities: state.adSuggestions!.cities,
  countries: state.adSuggestions!.countries,
}));

export const selectAreas = createSelector(selectCreateAd, (state) => ({
  areas: state.adSuggestions!.areas,
  countries: state.adSuggestions!.countries,
}));

export const selectLocations = createSelector(selectCreateAd, (state) => ({
  locations: [
    ...state.adSuggestions!.countries,
    ...state.adSuggestions!.cities,
    ...state.adSuggestions!.areas,
  ],
}));

export const createAdFeature = createFeature({
  name: StoreKeys.CREATE_AD,
  reducer: createAdReducer,
});
