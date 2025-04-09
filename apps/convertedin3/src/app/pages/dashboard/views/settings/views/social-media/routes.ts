import { Route } from "@angular/router";
import { SocialMediaComponent } from "./social-media.component";

export const SOCIAL_MEDIA_ROUTES: Route[] = [
    {
        path: '',
        component: SocialMediaComponent,
    },
    {
        path: 'facebook',
        loadComponent: () => import('./views/facebook/facebook.component').then(c => c.FacebookComponent)
    }
]
