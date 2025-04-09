import { Route } from '@angular/router';
import { AuthComponent } from './auth.component';
import { GuestGuard } from '../../core/guards/auth/guest.guard';

export const AUTH_ROUTES: Route[] = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },

      {
        path: 'register',
        loadComponent: () =>
          import('./view/register/register.component').then(
            (m) => m.registerComponent
          ),
        canActivate: [GuestGuard],
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./view/login/login.component').then((m) => m.LoginComponent),
        canActivate: [GuestGuard],
      },
      {
        path: 'auto-login',
        loadComponent: () =>
          import('./view/auto-login/auto-login.component').then(
            (m) => m.AutoLoginComponent
          ),
      },
      {
        path: 'verify-otp',
        loadComponent: () =>
          import('./view/otp/otp.component').then((m) => m.OtpComponent),
        canActivate: [GuestGuard],
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./view/forgot-password/forgot-password.component').then(
            (m) => m.ForgotPasswordComponent
          ),
        canActivate: [GuestGuard],
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./view/reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent
          ),
        canActivate: [GuestGuard],
      },
    ],
  },
];
