import { createReducer, on } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { AppActions } from '../action/app.action';

const authInitialState: AppState = {
  userData: null,
  notificationCount: 0,
};

export const appReducer = createReducer(
  authInitialState,
  on(AppActions.setUserData, (state, { userData }) => ({
    ...state,
    userData,
  })),
  on(AppActions.setEmailVerified, (state, { email_verified }) => ({
    ...state,
    userData:{
      ...state.userData!,
      email_verified,
    },
  })),
  on(AppActions.removeUserData, () => ({
    userData: null,
    notificationCount: 0,
    otpDate: null,
  })),
  on(AppActions.setNotificationCount, (state, { notificationCount }) => ({
    ...state,
    notificationCount,
  })),
  on(AppActions.addNotification, (state) => ({
    ...state,
    notificationCount: state.notificationCount + 1,
  }))
);
