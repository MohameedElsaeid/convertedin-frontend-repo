import { createReducer, on } from '@ngrx/store';
import { AppState } from '../models/interfaces';
import { AppActions } from '../action/app.action';

const appInitialState: AppState = {
  userData: undefined,
};

export const appReducer = createReducer(
  appInitialState,

  on(AppActions.setUserData, (state, { userData }) => ({
    ...state,
    userData,
  }))
);
