import { createReducer, on } from '@ngrx/store';
import { CreateAdState } from '../models/create-ad.interface';
import { CreateAdActions } from '../action/create-ad.action';

const createAdInitialState: CreateAdState = {
  goal: undefined,
  channel: undefined,
  post: undefined,
  adSuggestions: undefined,
  aiSuggestions: undefined,
  country: undefined,
};

export const createAdReducer = createReducer(
  createAdInitialState,
  // Set channel action
  on(CreateAdActions.setChannel, (state, { channel }) => ({
    ...state,
    channel,
    goal: undefined,
    post: undefined,
    adSuggestions: undefined,
    aiSuggestions: undefined,
  })),

  // Set post action
  on(CreateAdActions.setPost, (state, { post }) => ({
    ...state,
    post,
    adSuggestions: undefined,
    aiSuggestions: undefined,
  })),

  // Set goal action
  on(CreateAdActions.setGoal, (state, { goal }) => ({ ...state, goal })),

  // Set ad suggestions
  on(CreateAdActions.setAdSugguestions, (state, { suggestions }) => ({
    ...state,
    adSuggestions: suggestions,
  })),

  // Set AI suggestions
  on(CreateAdActions.setAISuggestions, (state, { suggestions }) => ({
    ...state,
    aiSuggestions: suggestions,
  })),

  // Delete interest action
  on(CreateAdActions.deleteInterestSuggestion, (state, { id }) => ({
    ...state,
    adSuggestions: {
      ...state.adSuggestions!,
      interests:
        state.adSuggestions?.interests.filter((item) => item.id !== id) || [],
    },
  })),

  // Delete behaviour action
  on(CreateAdActions.deleteBehaviourSuggestion, (state, { id }) => ({
    ...state,
    adSuggestions: {
      ...state.adSuggestions!,
      behaviors:
        state.adSuggestions?.behaviors.filter((item) => item.id !== id) || [],
    },
  })),

  // Delete demographic action
  on(CreateAdActions.deleteDemographicSuggestion, (state, { id }) => ({
    ...state,
    adSuggestions: {
      ...state.adSuggestions!,
      demographics:
        state.adSuggestions?.demographics.filter((item) => item.id !== id) ||
        [],
    },
  })),

  // Add interest
  on(CreateAdActions.addInterestSuggestion, (state, { item }) => ({
    ...state,
    adSuggestions: {
      ...state.adSuggestions!,
      interests: [...state.adSuggestions!.interests, item],
    },
  })),

  // Add Demographic
  on(CreateAdActions.addDemographicSuggestion, (state, { item }) => ({
    ...state,
    adSuggestions: {
      ...state.adSuggestions!,
      demographics: [...state.adSuggestions!.demographics, item],
    },
  })),

  // Add Behaviour
  on(CreateAdActions.addBehaviourSuggestion, (state, { item }) => ({
    ...state,
    adSuggestions: {
      ...state.adSuggestions!,
      behaviors: [...state.adSuggestions!.behaviors, item],
    },
  })),

  // Set Demographics
  on(CreateAdActions.setDemographicSuggestion, (state, { items }) => ({
    ...state,
    adSuggestions: {
      ...state.adSuggestions!,
      demographics: [...items],
    },
  })),

  // Set Behaviours
  on(CreateAdActions.setBehaviourSuggestion, (state, { items }) => ({
    ...state,
    adSuggestions: {
      ...state.adSuggestions!,
      behaviors: [...items],
    },
  })),

  // Set Interests
  on(CreateAdActions.setInterestSuggestion, (state, { items }) => ({
    ...state,
    adSuggestions: {
      ...state.adSuggestions!,
      interests: [...items],
    },
  })),

  // Update budget & duration
  on(
    CreateAdActions.updateAdBudgetAndDuration,
    (state, { budget, duration }) => ({
      ...state,
      adSuggestions: {
        ...state.adSuggestions!,
        days: duration,
        minimumBudget: {
          ...state.adSuggestions!.minimumBudget,
          amount: budget,
        },
      },
    })
  ),

  // Update audiance age action
  on(
    CreateAdActions.updateAdAudianceAge,
    (state, { maximumAge, minimumAge }) => ({
      ...state,
      aiSuggestions: {
        ...state.aiSuggestions!,
        maximumAge,
        minimumAge,
      },
    })
  ),

  // Update audiance gender action
  on(CreateAdActions.updateAdAudianceGender, (state, { gender }) => ({
    ...state,
    adSuggestions: {
      ...state.adSuggestions!,
      gender,
    },
  })),

  // Add country action
  on(CreateAdActions.addUserCountry, (state, { country }) => ({
    ...state,
    country,
  })),

  // Set cities action
  on(CreateAdActions.setAdCities, (state, { cities }) => {
    const oldState = JSON.parse(JSON.stringify(state));

    cities.length === 0 && oldState.adSuggestions!.areas.length === 0
      ? (oldState.adSuggestions!.countries = [oldState.country!])
      : (oldState.adSuggestions!.countries = []);

    oldState.adSuggestions!.cities = cities;

    return { ...oldState };
  }),

  // Set areas action
  on(CreateAdActions.setAdAreas, (state, { areas }) => {
    const oldState = JSON.parse(JSON.stringify(state));

    areas.length === 0 && oldState.adSuggestions!.cities.length === 0
      ? (oldState.adSuggestions!.countries = [oldState.country!])
      : (oldState.adSuggestions!.countries = []);

    oldState.adSuggestions!.areas = areas;

    return { ...oldState };
  }),

  // Add new city action
  on(CreateAdActions.addAdCity, (state, { city }) => {
    console.log(state.adSuggestions?.cities);
    return {
      ...state,
      adSuggestions: {
        ...state.adSuggestions!,
        cities: [...(state.adSuggestions!.cities || []), city],
      },
    };
  }),

  // Delete city action
  on(CreateAdActions.deleteAdCity, (state, { cityId }) => {
    const oldState = JSON.parse(JSON.stringify(state));

    oldState.adSuggestions!.cities = oldState.adSuggestions!.cities.filter(
      (item: any) => item.id !== cityId
    );

    if (
      oldState.adSuggestions!.areas.length === 0 &&
      oldState.adSuggestions!.cities.length === 0
    ) {
      oldState.adSuggestions!.countries = [oldState.country!];
    }

    return { ...oldState };
  }),

  // Add new area action
  on(CreateAdActions.addAdArea, (state, { area }) => ({
    ...state,
    adSuggestions: {
      ...state.adSuggestions!,
      areas: [...state.adSuggestions!.areas, area],
    },
  })),

  // Delete area action
  on(CreateAdActions.deleteAdArea, (state, { areaId }) => {
    const oldState = JSON.parse(JSON.stringify(state));

    oldState.adSuggestions!.areas = oldState.adSuggestions!.areas.filter(
      (item: any) => item.id !== areaId
    );

    if (
      oldState.adSuggestions!.areas.length === 0 &&
      oldState.adSuggestions!.cities.length === 0
    ) {
      oldState.adSuggestions!.countries = [oldState.country!];
    }

    return { ...oldState };
  }),

  // Reset action
  on(CreateAdActions.reset, () => ({
    adSuggestions: undefined,
    aiSuggestions: undefined,
    channel: undefined,
    goal: undefined,
    post: undefined,
    country: undefined,
  }))
);
