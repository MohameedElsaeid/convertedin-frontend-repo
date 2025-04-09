import { CommonModule } from '@angular/common';
import { StepperModule } from '@convertedin/ui';
import { TranslateModule } from '@ngx-translate/core';
import { SelectPlatformComponent } from './components/select-platform/select-platform.component';
import { SelectPostComponent } from './components/select-post/select-post.component';
import { SelectGoalComponent } from './components/select-goal/select-goal.component';
import { AdTargetComponent } from './components/ad-target/ad-target.component';
import { AdDataComponent } from './components/ad-data/ad-data.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { CreateAdBackBtnComponent } from '@flyerz/shared/components';
import { FacebookAdPreviewComponent } from './components/facebook-ad-preview/facebook-ad-preview.component';

export const createAdImports = [
  CommonModule,
  StepperModule,
  TranslateModule,
  CreateAdBackBtnComponent,
  SelectPlatformComponent,
  SelectPostComponent,
  SelectGoalComponent,
  AdTargetComponent,
  AdDataComponent,
  ButtonModule,
  RouterLink,

  FacebookAdPreviewComponent,
];
