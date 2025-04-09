import { Routes } from '@angular/router';
import { EmailTemplatesComponent } from './email-templates.component';

export const EMAIL_TEMPLATES_ROUTES: Routes = [
  {
    path: '',
    component: EmailTemplatesComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        loadComponent: () =>
          import(
            './views/email-templates-list/email-templates-list.component'
          ).then((comp) => comp.EmailTemplatesListComponent),
      },
      {
        path: 'create',
        loadComponent: () =>
          import(
            './views/email-templates-form/email-templates-form.component'
          ).then((comp) => comp.EmailTemplatesFormComponent),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import(
            './views/email-templates-form/email-templates-form.component'
          ).then((comp) => comp.EmailTemplatesFormComponent),
      },
    ],
  },
];
