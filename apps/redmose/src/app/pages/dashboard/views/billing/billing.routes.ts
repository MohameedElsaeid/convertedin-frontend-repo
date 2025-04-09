import { Routes } from '@angular/router';
import { BillingComponent } from './billing.component';

export const BILLING_ROUTES: Routes = [
  {
    path: '',
    component: BillingComponent,
    children: [
      { path: '', redirectTo: 'subscription-plans', pathMatch: 'full' },
      {
        path: 'invoices',
        loadComponent: () =>
          import('./views/invoices/invoices.component').then(
            (component) => component.InvoicesComponent
          ),
      },
      {
        path: 'subscription-plans',
        loadChildren: () =>
          import('./views/subscription-plans/subscription-plans.routes').then(
            (routes) => routes.SUBSCRIPTION_PLANS_ROUTES
          ),
      },
    ],
  },
];
