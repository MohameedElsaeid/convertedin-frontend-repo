import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlowBuilderEmailActionCardComponent } from '../flow-builder-email-action-card/flow-builder-email-action-card.component';
import { FormBuilderAddActionComponent } from '../form-builder-add-action/form-builder-add-action.component';
import { ButtonModule } from 'primeng/button';
import {
  FlowBuilderDelayActionCardComponent,
  FlowBuilderNotificationActionCardComponent,
  FlowBuilderSmsActionCardComponent,
  FlowBuilderTriggerActionCardComponent,
} from '../channels';

export const workflowImports = [
  CommonModule,
  ReactiveFormsModule,
  FlowBuilderTriggerActionCardComponent,
  FlowBuilderSmsActionCardComponent,
  FlowBuilderNotificationActionCardComponent,
  FlowBuilderDelayActionCardComponent,
  FlowBuilderEmailActionCardComponent,
  FormBuilderAddActionComponent,
  ButtonModule,
];
