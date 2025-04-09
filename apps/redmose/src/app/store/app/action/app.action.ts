import { createActionGroup, props } from '@ngrx/store';
import { UserData } from '@redmose/shared/api';

export const APP_FEATURE_NAME = 'app';

export const AppActions = createActionGroup({
  source: APP_FEATURE_NAME,
  events: {
    'Set User Data': props<{ userData: UserData }>(),
  },
});
