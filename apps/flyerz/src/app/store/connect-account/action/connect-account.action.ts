import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ConnectAccountActionTypes } from '../models/connect-account.enum';

export const ConnectAccountActions = createActionGroup({
  source: 'Connect Account',
  events: {
    [ConnectAccountActionTypes.SET_CATEGORY_ID]: props<{
      id: string | number;
    }>(),

    [ConnectAccountActionTypes.SET_CHANNEL_ID]: props<{ id: number }>(),

    [ConnectAccountActionTypes.SET_FACEBOOK_TOKEN]: props<{ token: string }>(),

    [ConnectAccountActionTypes.SET_PAGE_ID]: props<{ id: string }>(),

    [ConnectAccountActionTypes.RESET]: emptyProps(),
  },
});
