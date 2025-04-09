import { APP_FEATURE_NAME } from './action/app.action';
import { appReducer } from './reducer/app.reducer';

export const appFeature = {
  [APP_FEATURE_NAME]: appReducer,
};
