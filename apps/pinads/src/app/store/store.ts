import { authReducer } from "./auth";
import { StoreKeys } from "./store-keys.enum";

export const store = {
  [StoreKeys.AUTH]: authReducer,
};
