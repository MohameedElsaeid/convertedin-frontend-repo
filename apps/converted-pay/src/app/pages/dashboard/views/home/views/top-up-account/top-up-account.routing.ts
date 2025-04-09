import { Route } from '@angular/router';
import { TopUpAccountComponent } from './top-up-account.component';
import { providePaymentsApi } from '@converted-pay/shared/api';

export const TOPUP_ROUTES: Route[] = [
  {
    path: '',
    component: TopUpAccountComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./views/top-up-stepper/top-up-stepper.component').then(
            (c) => c.TopUpStepperComponent
          ),
        providers: [providePaymentsApi()],
      },
      
      {
        path: 'payment-receipt',
        loadComponent: () =>
          import('./views/payment-upload-receipt/payment-upload-receipt.component').then(
            (c) => c.PaymentUploadReceiptComponent
          ),
      },
      {
        path: 'payment-callback',
        loadComponent: () =>
          import('./views/payment-callback/payment-callback.component').then(
            (c) => c.PaymentCallbackComponent
          ),
      },
      // {
      //   path: 'success',
      //   loadComponent: () =>
      //     import('./views/payment-success/payment-success.component').then(
      //       (c) => c.PaymentSuccessComponent
      //     ),
      // },
      // {
      //   path: 'failure',
      //   loadComponent: () =>
      //     import('./views/payment-failure/payment-failure.component').then(
      //       (c) => c.PaymentFailureComponent
      //     ),
      // },
    ],
  },
];
