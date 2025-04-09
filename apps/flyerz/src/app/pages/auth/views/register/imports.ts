import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  PasswordConfirmPasswordComponent,
} from '@flyerz/shared/components';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ControlErrorsModule,
  PhoneNumberInputComponent,
} from '@convertedin/ui';

export const registerImports = [
  CommonModule,
  HeaderComponent,
  InputTextModule,
  ButtonModule,
  TranslateModule,
  ReactiveFormsModule,
  PhoneNumberInputComponent,
  ControlErrorsModule,
  PasswordConfirmPasswordComponent,
];
