import { CommonModule } from '@angular/common';
import {
  BackButtonComponent,
  SpinnerComponent,
} from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

export const paymentMethodImports = [
  CommonModule,
  BackButtonComponent,
  ButtonModule,
  SpinnerComponent,
  TranslateModule,
];
