import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthActionTypes } from '../models/auth.action.emum';
import { AuthState } from '../models/auth-state.interface';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    [AuthActionTypes.SET_USER_STATE]: props<AuthState>(),

    [AuthActionTypes.RESET_STATE]: emptyProps(),
  },
});
