import { AsyncPipe, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HeaderComponent,
  PasswordConfirmPasswordComponent,
} from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

export const changePasswordImports = [
  HeaderComponent,
  ReactiveFormsModule,
  ButtonModule,
  TranslateModule,
  NgIf,
  PasswordConfirmPasswordComponent,
  AsyncPipe,
];
