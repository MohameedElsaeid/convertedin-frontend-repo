import { appReducer } from './app';
import { authReducer } from './auth';
import { connectAccountReducer } from './connect-account';
import { createAdReducer } from './create-ad';
import { createAiMediaReducer } from './create-ai-media';
import { StoreKeys } from './store-keys.enum';
import { walletReducer } from './wallet';

export const store = {
  [StoreKeys.APP]: appReducer,
  [StoreKeys.AUTH]: authReducer,
  [StoreKeys.CONNECT_ACCOUNT]: connectAccountReducer,
  // [StoreKeys.CREATE_AD]: createAdReducer,
  // [StoreKeys.WALLET]: walletReducer,
  // [StoreKeys.CREATE_AI_MEDIA]: createAiMediaReducer,
};
