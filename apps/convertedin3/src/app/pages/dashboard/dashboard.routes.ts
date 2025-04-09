import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES:Route[] = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'campaigns', pathMatch: 'full' },
            {
                path: 'campaigns',
                loadChildren: () => import('./views/campaigns/campaigns.routes').then((routes) => routes.CAMPAIGNS_ROUTES),
            },
            {
                path: 'settings',
                loadChildren: () => import('./views/settings/routes').then((routes) => routes.SETTINGS_ROUTES),
            }
        ]
    }
]