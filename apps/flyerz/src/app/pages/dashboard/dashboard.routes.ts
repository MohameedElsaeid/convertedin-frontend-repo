import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { provideState } from '@ngrx/store';
import { walletFeature } from '@flyerz/store/wallet';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // Home route
      {
        path: '',
        loadChildren: () =>
          import('./views/home/home.routes').then(
            (routes) => routes.HOME_ROUTES
          ),
      },
      // Settings route
      {
        path: 'settings',
        loadChildren: () =>
          import('./views/settings/settings.routes').then(
            (routes) => routes.SETTINGS_ROUTES
          ),
      },
      // Wallet route
      {
        path: 'wallet',
        loadChildren: () =>
          import('./views/wallet/wallet.routes').then(
            (routes) => routes.WALLET_ROUTES
          ),
        providers: [provideState(walletFeature)],
      },
      // Studio route
      {
        path: 'studio',
        loadChildren: () =>
          import('./views/studio/studio.routes').then(
            (routes) => routes.STUDIO_ROUTES
          ),
      },
      // Post payment route
      {
        path: 'paymob/post-payment',
        loadComponent: () =>
          import('./views/post-payment/post-payment.component').then(
            (component) => component.PostPaymentComponent
          ),
      },
    ],
  },
];
