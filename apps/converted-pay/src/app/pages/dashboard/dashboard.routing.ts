import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HasFreeCredit } from '../../core/guards';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // Empty route
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      // Home route
      {
        path: 'home',
        loadChildren: () =>
          import('./views/home/home.routes').then(
            (routes) => routes.HOME_ROUTES
          ),
      },
      // Settings route
      {
        path: 'settings',
        loadComponent: () =>
          import('./views/settings/settings.component').then(
            (component) => component.SettingsComponent
          ),
      },
      // Accounts route
      {
        path: 'accounts',
        loadChildren: () =>
          import('./views/accounts/accounts.routing').then(
            (r) => r.ACCOUNT_ROUTES
          ),
      },
      // Referral route
      {
        path: 'referral',
        loadComponent: () =>
          import('./views/referral/referral.component').then(
            (c) => c.ReferralComponent
          ),
        canActivate: [HasFreeCredit],
      },
      //FAQ
      {
        path: 'faq',
        loadComponent: () =>
          import('./views/faq/faq.component').then((c) => c.FaqComponent),
      },
    ],
  },
];
