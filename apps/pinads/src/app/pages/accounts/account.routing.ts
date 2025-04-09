import { Route } from '@angular/router';
import { AccountComponent } from './account.component';

export const ACCOUNT_ROUTES: Route[] = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: '', redirectTo: 'google', pathMatch: 'full' },
      {
        path: 'google',
        loadComponent: () =>
          import('./views/google-connect/google-connect.component').then(
            (c) => c.GoogleConnectComponent
          ),
      },
      {
        path: 'google-callback',
        loadComponent: () =>
          import('./views/google-callback/google-callback.component').then(
            (c) => c.GoogleCallbackComponent
          ),
      },
    ],
  },
];
