import { Route } from '@angular/router';
import { SettingsComponent } from './settings.component';

export const SETTINGS_ROUTES:Route[] = [
    {
        path: '',
        component: SettingsComponent,
        children: [
            {
                path: '',
                redirectTo: 'social-media',
                pathMatch: 'full'
            },
            {
                path: 'social-media',
                loadChildren: () => import('./views/social-media/routes').then((routes) => routes.SOCIAL_MEDIA_ROUTES)
            }
        ]
    }
]