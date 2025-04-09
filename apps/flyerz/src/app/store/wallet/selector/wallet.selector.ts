import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { WalletState } from '../models/wallet.interface';
import { StoreKeys } from '@flyerz/store/store-keys.enum';
import { walletReducer } from '../reducer/wallet.reducer';

const selectWallet = createFeatureSelector<WalletState>(StoreKeys.WALLET);

export const selectAllWallet = createSelector(selectWallet, (state) => state);

export const walletFeature = createFeature({
  name: StoreKeys.WALLET,
  reducer: walletReducer,
});
