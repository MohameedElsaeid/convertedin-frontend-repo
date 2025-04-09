import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ControlErrorsModule,
  PhoneNumberInputComponent,
} from '@convertedin/ui';
import { BackButtonComponent } from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

export const paymentCodeImports = [
  CommonModule,
  PhoneNumberInputComponent,
  ButtonModule,
  BackButtonComponent,
  TranslateModule,
  ReactiveFormsModule,
  ControlErrorsModule,
];
