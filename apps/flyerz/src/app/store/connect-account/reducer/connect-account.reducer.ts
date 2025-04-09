import { createReducer, on } from '@ngrx/store';
import { ConnectAccountState } from '../models/connect-account.interface';
import { ConnectAccountActions } from '../action/connect-account.action';

const connectAccountInitialState: ConnectAccountState = {
  categoryId: '',
  channelId: -1,
  facebookAccessToken: '',
  facebookPageId: '',
};

export const connectAccountReducer = createReducer(
  connectAccountInitialState,
  // Set category ID
  on(ConnectAccountActions.setCategoryID, (state, { id }) => ({
    ...state,
    categoryId: id,
  })),
  // Set channel ID
  on(ConnectAccountActions.setChannelID, (state, { id }) => ({
    ...state,
    channelId: id,
  })),
  // Set facebook token
  on(ConnectAccountActions.setFacebookToken, (state, { token }) => ({
    ...state,
    facebookAccessToken: token,
  })),
  // Set facebook page id
  on(ConnectAccountActions.setPageID, (state, { id }) => ({
    ...state,
    facebookPageId: id,
  })),
  // Reset action
  on(ConnectAccountActions.reset, () => ({
    categoryId: '',
    channelId: -1,
    facebookAccessToken: '',
    facebookPageId: '',
  }))
);
