import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlErrorsModule } from '@convertedin/ui';
import {
  BackButtonComponent,
  CurrencyInputComponent,
} from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

export const paymentSummaryImports = [
  CommonModule,
  ButtonModule,
  TranslateModule,
  BackButtonComponent,
  InputNumberModule,
  ReactiveFormsModule,
  ControlErrorsModule,
  CurrencyInputComponent,
];
