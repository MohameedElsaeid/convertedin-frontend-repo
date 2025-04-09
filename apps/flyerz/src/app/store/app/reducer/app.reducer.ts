import { createReducer, on } from '@ngrx/store';
import { AppState } from '../models/app-state.interface';
import { AppActions } from '../action/app.action';
import { LocalStorageConstants } from '@flyerz/shared/constants';
import { ConnectionDetails } from '@flyerz/shared/api';

const appInitialState: AppState = {
  countryId: -1,
  userData: undefined,
  token: undefined,
  facebookAccessToken: undefined,
  connectionDetails: {} as ConnectionDetails,
  validations: undefined,
};

export const appReducer = createReducer(
  appInitialState,
  // Set country id
  on(AppActions.setCountryID, (state, { countryId }) => ({
    ...state,
    countryId: countryId,
  })),
  // Set user data
  on(AppActions.setUserData, (state, { user }) => {
    localStorage.setItem(LocalStorageConstants.TOKEN, user.apiToken);

    return { ...state, userData: user, token: user.apiToken };
  }),
  // Set facebook access token
  on(AppActions.setFacebookToken, (state, { token }) => ({
    ...state,
    facebookAccessToken: token,
  })),
  // Set connection details
  on(AppActions.setConnectionDetails, (state, { data }) => ({
    ...state,
    connectionDetails: data,
  })),
  // Set validations
  on(AppActions.setValidations, (state, { validations }) => ({
    ...state,
    validations,
  })),
  // Update user data
  on(AppActions.updateUserData, (state, { email, firstName, lastName }) => ({
    ...state,
    userData: {
      ...state.userData!,
      user: {
        ...state.userData!.user,
        firstName,
        lastName,
        email: {
          ...state.userData!.user.email,
          email,
        },
      },
    },
  })),
  // Update user email
  on(AppActions.updateUserEmail, (state, { email }) => ({
    ...state,
    userData: {
      ...state.userData!,
      user: {
        ...state.userData!.user,
        email: {
          ...state.userData!.user.email,
          email,
        },
      },
    },
  }))
);
