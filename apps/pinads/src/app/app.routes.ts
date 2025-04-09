import { Route } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { AccountGuard } from './core/guards/account/account.guard';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/accounts/account.routing').then(
        (m) => m.ACCOUNT_ROUTES
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.routing').then(
        (r) => r.DASHBOARD_ROUTES
      ),
    canActivate: [AuthGuard,AccountGuard],
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component').then(
        (c) => c.PrivacyPolicyComponent
      ),
  },
  {
    path: 'terms-and-conditions',
    loadComponent: () =>
      import('./pages/terms-and-condition/terms-and-condition.component').then(
        (c) => c.TermsAndConditionComponent
      ),
  },
  // { path: '**', redirectTo: 'auth' },
];
