import { Route } from '@angular/router';
import { authGuard } from './core/guards/';

export const appRoutes: Route[] = [
  // Dashboard route
  {
    path: 'dashboards',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.routes').then(
        (routes) => routes.DASHBOARD_ROUTES
      ),

    canActivate: [authGuard],
  },
  // Default route
  { path: '', redirectTo: '/dashboards', pathMatch: 'full' },
];
