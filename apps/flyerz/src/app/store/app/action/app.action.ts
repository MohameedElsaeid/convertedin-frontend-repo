import { createActionGroup, props } from '@ngrx/store';
import { AppActionTypes } from '../models/app.action.enum';
import { ConnectionDetails, UserData, Validations } from '@flyerz/shared/api';

export const AppActions = createActionGroup({
  source: 'App',
  events: {
    [AppActionTypes.SET_COUNTRY_ID]: props<{ countryId: number }>(),

    [AppActionTypes.SET_USER_DATA]: props<{ user: UserData }>(),

    [AppActionTypes.SET_FACEBOOK_TOKEN]: props<{ token: string }>(),

    [AppActionTypes.SET_CONNECTION_DETAILS]: props<{
      data: ConnectionDetails;
    }>(),

    [AppActionTypes.SET_VALIDATIONS]: props<{ validations: Validations }>(),

    [AppActionTypes.UPDATE_USER_DATA]: props<{
      firstName: string;
      lastName: string;
      email: string;
    }>(),

    [AppActionTypes.UPDATE_USER_EMAIL]: props<{ email: string }>(),
  },
});
