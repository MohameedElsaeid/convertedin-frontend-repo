import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { provideState } from '@ngrx/store';
import { rechargeFeature } from '@converted-pay/store/recharge';
import { HasConnectedAccountGuards, WaitingListGuards } from 'apps/converted-pay/src/app/core/guards';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      // Home route
      {
        path: '',
        loadComponent: () =>
          import('./views/home/home.component').then(
            (component) => component.HomeComponent
          ),
      },

      // Topup account route
      {
        path: 'topup-account',
        loadChildren: () =>
          import('./views/top-up-account/top-up-account.routing').then(
            (r) => r.TOPUP_ROUTES
          ),
        providers: [provideState(rechargeFeature)],
        canActivate:[WaitingListGuards,HasConnectedAccountGuards]
      },
    ],
  },
];
