import { Route } from '@angular/router';
import { AuthComponent } from './auth.component';

export const AUTH_ROUTES: Route[] = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./views/login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./views/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'register/:referralCode',
        loadComponent: () =>
          import('./views/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./views/forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent
          ),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./views/reset-password/reset-password.component').then(
            (c) => c.ResetPasswordComponent
          ),
      },
      {
        path: 'verify-otp',
        loadComponent: () =>
          import('./views/verify-otp/verify-otp.component').then(
            (c) => c.VerifyOtpComponent
          ),
      },
    ],
  },
];
