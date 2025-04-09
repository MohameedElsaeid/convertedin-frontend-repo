import { Route } from '@angular/router';
import { provideCampaignService } from '@pinads/shared/api/campaign';
import { DashboardComponent } from './dashboard.component';
import { provideBrandService } from '@pinads/shared/api/brand';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'campaign',
        loadChildren: () =>
          import('./views/campaign/campaign.routing').then(
            (r) => r.CAMPAIGN_ROUTES
          ),
        providers: [provideCampaignService()],
      },
      {
        path: 'overview',
        loadComponent: () =>
          import('./views/campaign-overview/campaign-overview.component').then(
            (c) => c.CampaignOverviewComponent
          ),
        providers: [provideCampaignService(), provideBrandService()],
      },
      {
        path: 'connected-account',
        loadComponent: () =>
          import(
            './views/connected-google-account/connected-google-account.component'
          ).then((c) => c.ConnectedGoogleAccountComponent),
      },
      {
        path: 'faq',
        loadComponent: () =>
          import(
            './views/faq/faq.component'
          ).then((c) => c.FaqComponent),
      },
      {
        path: 'keyword-finder',
        loadComponent: () =>
          import(
            './views/keyword-finder/keyword-finder.component'
          ).then((c) => c.KeywordFinderComponent),
      },
      {
        path: 'campaign-details/:id',
        loadComponent: () =>
          import('./views/campaign-details/campaign-details.component').then(
            (c) => c.CampaignDetailsComponent
          ),
      },
    ],
  },
];
