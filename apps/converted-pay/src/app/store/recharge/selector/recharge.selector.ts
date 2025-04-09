import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RechargeState } from '../models/recharge-state.interface';
import { RECHARGE_FEATURE_NAME } from '../action/recharge.action';

const selectRecharge = createFeatureSelector<RechargeState>(
  RECHARGE_FEATURE_NAME
);

export const selectRechargeAmountDetails = createSelector(
  selectRecharge,
  (state) => ({
    rechargeAmount: state.rechargeAmount,
    fees: state.fees,
    agencyFee: state.agencyFee,
    vatFee: state.vatFee,
    totalAmount: state.totalAmount,
  })
);

export const selectTotalAmount = createSelector(selectRecharge, (state) => ({
  totalAmount: Object.values(state.fees!.data).reduce((total, item) => {
    const extraFee =
      item.type === 'fixed'
        ? item.amount
        : (state.rechargeAmount || 0) * (item.amount / 100);
    return total + extraFee;
  }, state.rechargeAmount || 0),
}));
