import { StepperModule } from '@convertedin/ui';
import { CreateAdBackBtnComponent } from '@flyerz/shared/components';
import { StudioPaymentComponent } from '@flyerz/shared/pages';
import { TranslateModule } from '@ngx-translate/core';
import { SelectTemplateComponent } from './components/select-template/select-template.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { CommonModule } from '@angular/common';
import { LottieComponent } from 'ngx-lottie';

export const createAiImageImports = [
  CommonModule,
  StepperModule,
  TranslateModule,
  StudioPaymentComponent,
  CreateAdBackBtnComponent,
  SelectTemplateComponent,
  UploadImageComponent,
  LottieComponent,
];
