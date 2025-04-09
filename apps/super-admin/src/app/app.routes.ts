import { Route } from '@angular/router';
import { AuthGuard, GuestGuard } from './core/guards';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((routes) => routes.AUTH_ROUTES),
    canActivate: [GuestGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.routes').then(
        (routes) => routes.DASHBOARD_ROUTES
      ),
      canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
];
