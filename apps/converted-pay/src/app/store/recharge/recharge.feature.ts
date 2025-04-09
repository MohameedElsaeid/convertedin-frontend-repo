import { createFeature } from '@ngrx/store';
import { rechargeReducer } from './reducer/recharge.reducer';
import { RECHARGE_FEATURE_NAME } from './action/recharge.action';

export const rechargeFeature = createFeature({
  name: RECHARGE_FEATURE_NAME,
  reducer: rechargeReducer,
});
