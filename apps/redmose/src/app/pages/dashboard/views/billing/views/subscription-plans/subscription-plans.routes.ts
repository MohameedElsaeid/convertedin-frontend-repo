import { Routes } from '@angular/router';
import { SubscriptionPlansComponent } from './subscription-plans.component';

export const SUBSCRIPTION_PLANS_ROUTES: Routes = [
  {
    path: '',
    component: SubscriptionPlansComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './views/subscription-plans/subscription-plans.component'
          ).then((component) => component.SubscriptionPlansComponent),
      },
      {
        path: 'change-plan',
        loadComponent: () =>
          import('./views/change-plan/change-plan.component').then(
            (component) => component.ChangePlanComponent
          ),
      },
    ],
  },
];
