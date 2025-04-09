import { Routes } from '@angular/router';
import { StudioComponent } from './studio.component';

export const STUDIO_ROUTES: Routes = [
  {
    path: '',
    component: StudioComponent,
    children: [
      // Default route
      { path: '', redirectTo: 'ai-image', pathMatch: 'full' },
      // Ai image route
      {
        path: 'ai-image',
        loadComponent: () =>
          import(
            './views/studio-image-service/studio-image-service.component'
          ).then((component) => component.StudioImageServiceComponent),
      },
      // Ai video route
      {
        path: 'ai-video',
        loadComponent: () =>
          import(
            './views/studio-video-service/studio-video-service.component'
          ).then((component) => component.StudioVideoServiceComponent),
      },
    ],
  },
];
