import { Route } from '@angular/router';
import { AuthGuard, GuestGuard } from './core/guards';

export const appRoutes: Route[] = [
  // Empty route
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  // Auth route
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routing').then((routes) => routes.AUTH_ROUTES),
    canActivate:[GuestGuard]
  },
  // Dashboard route
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.routing').then(
        (routes) => routes.DASHBOARD_ROUTES
      ),
      canActivate:[AuthGuard]
  },
];
