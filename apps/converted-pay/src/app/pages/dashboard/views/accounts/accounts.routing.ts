import { Route } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { WaitingListGuards } from 'apps/converted-pay/src/app/core/guards';

export const ACCOUNT_ROUTES: Route[] = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./views/accounts-view/accounts-view.component').then(
            (c) => c.AccountsViewComponent
          ),
      },
      {
        path: 'connect',
        loadComponent: () =>
          import('./views/accounts-connect/accounts-connect.component').then(
            (c) => c.AccountsConnectComponent
          ),
        canActivate: [WaitingListGuards],
      },
      {
        path: 'meta-account',
        loadComponent: () =>
          import('./views/meta-connect/meta-connect.component').then(
            (c) => c.MetaConnectComponent
          ),
        canActivate: [WaitingListGuards],
      },
      {
        path: 'account-callback/1',
        loadComponent: () =>
          import(
            './views/google-connect-callback/google-connect-callback.component'
          ).then((c) => c.GoogleConnectCallbackComponent),
        // canActivate: [WaitingListGuards],
      },
      {
        path: 'account-callback/2',
        loadComponent: () =>
          import(
            './views/meta-account-callback/meta-account-callback.component'
          ).then((c) => c.MetaAccountCallbackComponent),
        canActivate: [WaitingListGuards],
      },
    ],
  },
];
