import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StepperModule } from '@convertedin/ui';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TranslateModule } from '@ngx-translate/core';
import {
  AdCampaignComponent,
  BusinessTypeComponent,
  CampaignBudgetComponent,
  CampaignViewComponent,
  PreviewAndPublishComponent,
  SelectBusinessBranchComponent,
  SelectBusinessComponent,
  TargetingComponent,
  TargetingKeywordComponent,
} from './components';

export const campaignStepperImports = [
  CommonModule,
  ReactiveFormsModule,
  ButtonModule,
  StepperModule,
  AdCampaignComponent,
  TargetingComponent,
  CampaignBudgetComponent,
  BusinessTypeComponent,
  SelectBusinessComponent,
  SelectBusinessBranchComponent,
  ProgressSpinnerModule,
  PreviewAndPublishComponent,
  CampaignViewComponent,
  TranslateModule,
  TargetingKeywordComponent
];
