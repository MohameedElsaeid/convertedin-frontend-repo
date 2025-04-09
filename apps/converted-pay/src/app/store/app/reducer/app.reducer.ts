import { createReducer, on } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { AppActions } from '../action/app.action';
import { UserData } from '@converted-pay/shared/api';

const appInitialState: AppState = {};

export const appReducer = createReducer(
  appInitialState,

  on(AppActions.setUserData, (state, { userData }) => ({
    ...state,
    userData,
  })),
  on(AppActions.setConnectedAccount, (state, { connectedAccounts }) => {
    const userData:UserData ={ ...state.userData!,connectedAccounts}
    return { ...state,userData };
  })
);
