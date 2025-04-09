import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import {
  ControlErrorsModule,
  PhoneNumberInputComponent,
} from '@convertedin/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';

export const loginImports = [
  CommonModule,
  ButtonModule,
  HeaderComponent,
  TranslateModule,
  PhoneNumberInputComponent,
  ReactiveFormsModule,
  ControlErrorsModule,
  PasswordModule,
  DividerModule,
  RouterLink,
];
