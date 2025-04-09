import { Routes } from '@angular/router';
import { canAddFunds } from './guards';
import { WalletComponent } from './wallet.component';

export const WALLET_ROUTES: Routes = [
  {
    path: '',
    component: WalletComponent,
    children: [
      // Wallet home route
      {
        path: '',
        loadComponent: () =>
          import('./views/home/home.component').then(
            (component) => component.HomeComponent
          ),
      },
      // Add funds route
      {
        path: 'add-funds',
        loadComponent: () =>
          import('./views/payment-method/payment-method.component').then(
            (component) => component.PaymentMethodComponent
          ),
        canActivate: [canAddFunds],
      },
      // Payment summary route
      {
        path: 'funds-summary',
        loadComponent: () =>
          import('./views/payment-summary/payment-summary.component').then(
            (component) => component.PaymentSummaryComponent
          ),
      },
      // Payment code route
      {
        path: 'payment-code',
        loadComponent: () =>
          import('./views/payment-code/payment-code.component').then(
            (component) => component.PaymentCodeComponent
          ),
      },
    ],
  },
];
