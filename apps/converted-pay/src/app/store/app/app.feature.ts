import { APP_FEATURE_NAME } from './models/app-actions.enum';
import { appReducer } from './reducer/app.reducer';

export const appFeature = {
  [APP_FEATURE_NAME]: appReducer,
};
