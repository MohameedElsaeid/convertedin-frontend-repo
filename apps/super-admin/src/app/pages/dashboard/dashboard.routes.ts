import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'email-templates',
        loadChildren: () =>
          import('./views/email-templates/email-templates.routes').then(
            (routes) => routes.EMAIL_TEMPLATES_ROUTES
          ),
      },
    ],
  },
];
