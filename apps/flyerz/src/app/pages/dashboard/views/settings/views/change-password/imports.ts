import { NgClass, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ControlErrorsModule } from '@convertedin/ui';
import {
  HeaderComponent,
  PasswordConfirmPasswordComponent,
} from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

export const changePasswordImports = [
  ButtonModule,
  NgIf,
  PasswordConfirmPasswordComponent,
  PasswordModule,
  TranslateModule,
  HeaderComponent,
  ReactiveFormsModule,
  ControlErrorsModule,
  NgClass,
  RouterLink,
];
