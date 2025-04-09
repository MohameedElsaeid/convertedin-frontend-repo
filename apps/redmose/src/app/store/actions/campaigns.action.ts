import { createAction, props } from '@ngrx/store';

export enum CampaignsActionTypes {
  SET_FORM_OBJECTIVE_VALUE = '[Create Campaign] Set Form Objective Value',
  SET_FORM_PLATFORMS_VALUE = '[Create Campaign] Set Form Platforms Value',
  SET_FORM_SETTINGS_VALUE = '[Create Campaign] Set Form Settings Value',
  SET_FORM_SETUP_VALUE = '[Create Campaign] Set Form Setup Value',
  SET_FORM_ADSETS_VALUE = '[Create Campaign] Set Form Adsets Value',
  SET_ALL_FORMS = '[Create Campaign] Set All Forms Value',
  SET_ACTIVE_FORM = '[Create Campaign] Set Active Form',
  SET_ACTIVE_ADS = '[Create Campaign] Set Active Ads',
  SET_SUBMITTED_FORM = '[Create Campaign] Set Submitted Form',
  SET_FORM_BUDGET_VALUE = '[Create Campaign] Set Form Budget Value',
}

export const setCampaignObjectiveFormValue = createAction(
  CampaignsActionTypes.SET_FORM_OBJECTIVE_VALUE,
  props<{ payload: any }>()
);
export const setCampaignPlatformsFormValue = createAction(
  CampaignsActionTypes.SET_FORM_PLATFORMS_VALUE,
  props<{ payload: any }>()
);

export const setCampaignBudgetFormValue = createAction(
  CampaignsActionTypes.SET_FORM_BUDGET_VALUE,
  props<{ payload: any }>()
);

export const setCampaignSettingsFormValue = createAction(
  CampaignsActionTypes.SET_FORM_SETTINGS_VALUE,
  props<{ payload: any }>()
);

export const setCampaignSetupFormValue = createAction(
  CampaignsActionTypes.SET_FORM_SETUP_VALUE,
  props<{ payload: any }>()
);
export const setCampaignAdsetsFormValue = createAction(
  CampaignsActionTypes.SET_FORM_ADSETS_VALUE,
  props<{ payload: any }>()
);

export const setAllFormValue = createAction(
  CampaignsActionTypes.SET_ALL_FORMS,
  props<{ payload: any }>()
);

export const setActiveCampaignForm = createAction(
  CampaignsActionTypes.SET_ACTIVE_FORM,
  props<{ payload: number }>()
);

export const setActiveAdsForm = createAction(
  CampaignsActionTypes.SET_ACTIVE_ADS,
  props<{ payload: number }>()
);

export const setSubmittedForm = createAction(
  CampaignsActionTypes.SET_SUBMITTED_FORM,
  props<{
    key: string;
    value: any;
  }>()
);
