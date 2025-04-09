import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '@pinads/shared/api/auth';

export const AppActions = createActionGroup({
  source: 'app',
  events: {
    'Set User Data': props<{ userData: User }>(),
    'Set Email Verified': props<{ email_verified: boolean }>(),
    'Remove User Data': emptyProps(),
    'Set Notification Count': props<{ notificationCount: number }>(),
    'Add Notification': emptyProps(),
  },
});
