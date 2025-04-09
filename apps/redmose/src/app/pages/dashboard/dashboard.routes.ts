import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      // Default route
      { path: '', redirectTo: 'campaigns', pathMatch: 'full' },
      // Advanced campaigns route
      {
        path: 'campaigns',
        loadChildren: () =>
          import('./views/campaigns/campaigns.module').then(
            (m) => m.CampaignsModule
          ),
      },
      // Flow builder route
      {
        path: 'flow-builder',
        loadChildren: () =>
          import('./views/flow-builder/flow-builder.routes').then(
            (routes) => routes.FLOW_BUILDER_ROUTES
          ),
      },
      // Billing route
      {
        path: 'billing',
        loadChildren: () =>
          import('./views/billing/billing.routes').then(
            (routes) => routes.BILLING_ROUTES
          ),
      },
      {
        path: 'people',
        loadChildren: () =>
          import('./views/people/people.routes').then(
            (routes) => routes.PEOPLE_ROUTES
          ),
      },
      // Notifications route
      {
        path: 'notifications',
        loadChildren: () =>
          import('./views/notification-center/notification-center.module').then(
            (module) => module.NotificationCenterModule
          ),
      },
    ],
  },
  {
    path: 'not-found',
    data: {status_code:'404', status_msg: 'Not Found'},
    loadComponent: () =>
      import('../../shared/components/404/404.component').then((c) => c.NotFoundComponent)
  },
  {
    path: 'not-allowed',
    data: {status_code:403,status_msg:`You don't have the right access`},
    loadComponent: () =>
      import('../../shared/components/404/404.component').then((c) => c.NotFoundComponent)
  },
  {
    path:'**',
    redirectTo: 'not-found',
    pathMatch: 'full' 
  },
];
