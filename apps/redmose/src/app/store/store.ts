import * as campaignReducer from './reducers/campaigns.reducer';
import * as appReducer from './reducers/app.reducer';
import { flowBuilderReducer } from './flow-builder';
import { appFeature } from './app';

export const store = {
  campaigns: campaignReducer.reducer,
  configuration: appReducer.reducer,
  flowBuilder: flowBuilderReducer,
  ...appFeature,
};
