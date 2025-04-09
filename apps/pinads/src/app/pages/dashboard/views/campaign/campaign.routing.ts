import { Routes } from '@angular/router';
import { CampaignComponent } from './campaign.component';
import { provideState } from '@ngrx/store';
import { campaignFeature } from '@pinads/store/campaign';

export const CAMPAIGN_ROUTES: Routes = [
  {
    path: '',
    component: CampaignComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./view/campaign-stepper/campaign-stepper.component').then(
            (m) => m.CampaignStepperComponent
          ),
        providers: [provideState(campaignFeature)],
      },
      {
        path: 'publish',
        loadComponent: () =>
          import('./view/campaign-published/campaign-published.component').then(
            (m) => m.CampaignPublishedComponent
          ),
      },
      {
        path: 'failed',
        loadComponent: () =>
          import('./view/campaign-failed/campaign-failed.component').then(
            (m) => m.CampaignFailedComponent
          ),
      },
      {
        path: 'payment',
        loadComponent: () =>
          import('./view/campaign-payment/campaign-payment.component').then(
            (m) => m.CampaignPaymentComponent
          ),
      },
    ],
  },
];
