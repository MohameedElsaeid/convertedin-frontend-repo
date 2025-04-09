import { Routes } from '@angular/router';
import { CampaignsComponent } from './campaigns.component';


export const CAMPAIGNS_ROUTES: Routes = [
  {
    path: '',
    component: CampaignsComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      //OverView route
      {
        path: 'overview',
        data: {
          title: 'Create New Campaign',
          subtitle: 'Start from scratch with blank or select template'
        },
        loadComponent: () =>
          import('./views/templates-overview/templates-overview.component').then(
            (component) => component.TemplatesOverviewComponent
          ),
      },
      //Template Details route will be added her overview/template/:id
      {
        path: 'create-template-campaign/:id',
        data: {
          title: 'Create Campaign',
          subtitle: 'Preview template'
        },
        loadComponent: () =>
          import('./views/create-template-campaign/create-template-campaign.component').then(
            (component) => component.CreateTemplateCampaignComponent
          ),
      },
      {
        path: 'create-blank-campaign',
        data: {
          title: 'Create Campaign',
          subtitle: 'Blank Campaign'
        },
        loadComponent: () =>
          import('./views/create-blank-campaign/create-blank-campaign.component').then(
            (component) => component.CreateBlankCampaignComponent
        ),
      }
    ]
  },
];
