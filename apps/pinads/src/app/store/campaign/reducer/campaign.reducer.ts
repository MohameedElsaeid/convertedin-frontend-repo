import { createReducer, on } from '@ngrx/store';
import { CampaignActions } from '../action/campaign.action';
import { CampaignState } from '../models/campaign-state.interface';
import { isStringArraysAreEqual } from '../../../core/utilities';

const campaignInitialState: CampaignState = {
  keywords: [],
  description: [],
  headlines: [],
  locations: [],
  brand: null,
  budget: null,
  lang_code: null,
  proximity: null,
  campaign_name: null,
  brandInfo: {},
  is_custom_budget: false,
  custom_budget: null,
  isKeywordChanged: false,
  keywordPlaner:[]
};

export const campaignReducer = createReducer(
  campaignInitialState,
  on(CampaignActions.getBrandLocationList, (state, { brandLocationList }) => ({
    ...state,
    brandLocationList,
  })),
  on(CampaignActions.setBrand, (state, { brand }) => {
    if (state.brand?.id != brand?.id) {
      state = campaignInitialState;
    }
    return { ...state, brand };
  }),
  on(CampaignActions.setLocations, (state, { locations }) => ({
    ...state,
    locations,
  })),
  on(
    CampaignActions.setTargetForm,
    (state, { keywords, lang_code, proximity, campaign_name }) => {
      return ({
      ...state,
      keywords,
      lang_code,
      proximity,
      campaign_name,
      isKeywordChanged: !isStringArraysAreEqual(keywords,state.keywords)
      
    })}
  ),
  on(
    CampaignActions.setAdCampaignForm,
    (state, { headlines, description }) => ({
      ...state,
      headlines,
      description,
    })
  ),
  on(CampaignActions.setBudget, (state, { budget }) => ({
    ...state,
    budget,
    is_custom_budget: false,
    custom_budget_micros: null,
  })),
  on(CampaignActions.setCustomBudget, (state, { custom_budget }) => ({
    ...state,
    custom_budget,
    is_custom_budget: true,
    budget: null,
  })),
  on(CampaignActions.setProximity, (state, { proximity }) => ({
    ...state,
    proximity,
  })),
  on(CampaignActions.resetCampaignState, () => ({
    ...campaignInitialState,
  })),
  on(CampaignActions.setBranchInfo, (state, { brandInfo }) => ({
    ...state,
    brandInfo,
  })),
  on(CampaignActions.setKeywordPlanner, (state, { keywordPlaner }) => ({
    ...state,
    keywordPlaner,
    isKeywordChanged: false,
  })),
);
