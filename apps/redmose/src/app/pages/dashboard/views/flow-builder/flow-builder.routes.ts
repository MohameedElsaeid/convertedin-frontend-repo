import { Routes } from '@angular/router';
import { FlowBuilderComponent } from './flow-builder.component';
import { FlowBuilderModes } from './models';

export const FLOW_BUILDER_ROUTES: Routes = [
  {
    path: '',
    component: FlowBuilderComponent,
    children: [
      // Listing route
      {
        path: '',
        loadComponent: () =>
          import(
            './views/flow-builder-listing/flow-builder-listing.component'
          ).then((component) => component.FlowBuilderListingComponent),
      },
      // Create flow route
      {
        path: 'create',
        loadComponent: () =>
          import(
            './views/flow-builder-create/flow-builder-create.component'
          ).then((component) => component.FlowBuilderCreateComponent),
        data: { mode: FlowBuilderModes.CREATE },
      },
      // Edit flow route
      {
        path: 'edit/:flowId',
        loadComponent: () =>
          import(
            './views/flow-builder-create/flow-builder-create.component'
          ).then((component) => component.FlowBuilderCreateComponent),
        data: { mode: FlowBuilderModes.EDIT },
      },
      // Flow builder templates
      {
        path: 'templates',
        loadComponent: () =>
          import(
            './views/flow-builder-templates/flow-builder-templates.component'
          ).then((component) => component.FlowBuilderTemplatesComponent),
      },
    ],
  },
];
