import { createActionGroup, props } from '@ngrx/store';
import { APP_FEATURE_NAME, AppActionTypes } from '../models/app-actions.enum';
import { ConnectedAccount, UserData } from '@converted-pay/shared/api';

export const AppActions = createActionGroup({
  source: APP_FEATURE_NAME,
  events: {
    [AppActionTypes.SET_USER_DATA]: props<{ userData: UserData }>(),
    [AppActionTypes.SET_CONNECTED_ACCOUNTS]: props<{ connectedAccounts: ConnectedAccount[] }>(),
  },
});
