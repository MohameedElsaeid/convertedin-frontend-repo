import { Route } from '@angular/router';

export const APP_ROUTES: Route[] = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      loadChildren: () =>
        import('./pages/dashboard/dashboard.routes').then(
          (routes) => routes.DASHBOARD_ROUTES
        ),
      // canActivate: [],
    },
    // {
    //   path: 'onboarding',
    //    // canActivate: []
    //   children: [
    //     {
    //       path: '',
    //     }
    //   ]
    // },
    {
      path: 'auth',
      loadChildren: () =>
        import('./pages/auth/auth.routes').then(
          (routes) => routes.AUTH_ROUTES
        ),
      // canActivate: []
    }
];
