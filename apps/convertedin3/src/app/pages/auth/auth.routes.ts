import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      // Empty route
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      // Login route
      {
        path: 'login',
        loadComponent: () =>
          import('./views/login/login.component').then(
            (component) => component.LoginComponent
          ),
      },
      // Register route
      {
        path: 'register',
        loadComponent: () =>
          import('./views/register/register.component').then(
            (component) => component.RegisterComponent
          ),
      },
      // Verify email route with the otp
      {
        path: 'verify-email',
        loadComponent: () =>
          import('./views/email-verify/email-verify.component').then(
            (component) => component.EmailVerifyComponent
          ),
      },
      // Success route
      {
        path: 'success',
        loadComponent: () =>
          import(
            '@convertedin3/shared/pages/auth-success/auth-success.component'
          ).then((component) => component.AuthSuccessComponent),
        data: { type: 'signup' }, // This should change based on the source
      },
      // Forget password route
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./views/forgot-password/forgot-password.component').then(
            (component) => component.ForgotPasswordComponent
          ),
      },
      // Reset password route
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./views/reset-password/reset-password.component').then(
            (component) => component.ResetPasswordComponent
          ),
        data: { type: 'password-reset' } // Coming from the reset password screen
      },
    ],
  },
];
