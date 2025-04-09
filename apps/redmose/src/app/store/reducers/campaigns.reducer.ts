import { Action, createReducer, on } from '@ngrx/store';
import {
  setActiveAdsForm,
  setActiveCampaignForm,
  setAllFormValue,
  setCampaignAdsetsFormValue,
  setCampaignBudgetFormValue,
  setCampaignObjectiveFormValue,
  setCampaignPlatformsFormValue,
  setCampaignSettingsFormValue,
  setCampaignSetupFormValue,
  setSubmittedForm,
} from '../actions/campaigns.action';

export interface State {
  forms: {
    objective: any;
    platforms: any;
    settings: any;
    setup: any;
    adsets: any;
  };
  pagesConfigurations: {
    objective: {
      index: number;
      validationMessage: string;
    };
    platforms: {
      index: number;
      validationMessage: string;
    };
    settings: {
      index: number;
      validationMessage: string;
    };
    setup: {
      index: number;
      validationMessage: string;
    };
    adsets: {
      index: number;
      validationMessage: string;
    };
  };
  activeForm: number;
}

export const initialState = {
  forms: {
    objective: null,
    platforms: null,
    settings: {
      type: 'blank',
      settings: 'static',
      isValid: true,
    },
    setup: {
      submitted: false,
    },
    adsets: {
      submitted: false,
    },
    budget: {
      value: 0,
      type: 'daily',
    },
  },
  pagesConfigurations: {
    objective: {
      index: 0,
      validationMessage: 'Please select an objective',
    },
    platforms: {
      index: 1,
      validationMessage: 'Please select a platform',
    },
    settings: {
      index: 2,
      validationMessage: 'Please select a platform',
    },
    setup: {
      index: 3,
      validationMessage: 'Please select a platform',
    },
    adsets: {
      index: 4,
      validationMessage: 'Please select a platform',
    },
    ads: {
      index: 5,
      validationMessage: 'Please select a platform',
    },
  },
  activeForm: 0,
};

export const CampaignReducer = createReducer(
  initialState,
  on(setCampaignObjectiveFormValue, (state, action) => ({
    ...state,
    forms: {
      ...state.forms,
      objective: action.payload,
    },
  })),
  on(setCampaignPlatformsFormValue, (state, action) => ({
    ...state,
    forms: {
      ...state.forms,
      platforms: action.payload,
    },
    pagesConfigurations: {
      ...state.pagesConfigurations,
      platforms: {
        ...state.pagesConfigurations.platforms,
        dirty: true,
      },
    },
  })),
  on(setCampaignSettingsFormValue, (state, action) => ({
    ...state,
    forms: {
      ...state.forms,
      settings: action.payload,
    },
    pagesConfigurations: {
      ...state.pagesConfigurations,
      settings: {
        ...state.pagesConfigurations.settings,
        dirty: true,
      },
    },
  })),
  on(setCampaignBudgetFormValue, (state, action) => ({
    ...state,
    forms: {
      ...state.forms,
      budget: action.payload,
    },
    pagesConfigurations: {
      ...state.pagesConfigurations,
      settings: {
        ...state.pagesConfigurations.settings,
        dirty: true,
      },
    },
  })),
  on(setCampaignSetupFormValue, (state, action) => ({
    ...state,
    forms: {
      ...state.forms,
      setup: {
        ...state.forms.setup,
        ...action.payload,
      },
    },
    pagesConfigurations: {
      ...state.pagesConfigurations,
      setup: {
        ...state.pagesConfigurations.setup,
        dirty: true,
      },
    },
  })),
  on(setCampaignAdsetsFormValue, (state, action) => ({
    ...state,
    forms: {
      ...state.forms,
      adsets: {
        ...state.forms.adsets,
        ...action.payload,
      },
    },
    pagesConfigurations: {
      ...state.pagesConfigurations,
      adsets: {
        ...state.pagesConfigurations.adsets,
        dirty: true,
      },
    },
  })),
  on(setActiveCampaignForm, (state, action) => ({
    ...state,
    activeForm: action.payload,
  })),
  on(setSubmittedForm, (state, action) => ({
    ...state,
    forms: {
      ...state.forms,
      [action.key]: {
        ...state.forms[action.key],
        submitted: action.value,
      },
    },
  })),
  on(setAllFormValue, (state, action) => {
    console.log(state,'state reducer');
    console.log(action.payload,'state action');
    const stateReturn = {
      ...state,
      forms: {...action.payload}
    }
    console.log(stateReturn,"stateReturn");
    return stateReturn;
  })
);

export function reducer(state: State | any, action: Action) {
  return CampaignReducer(state, action);
}
