import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ControlErrorsModule,
  PhoneNumberInputComponent,
} from '@convertedin/ui';
import { HeaderComponent } from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

export const forgetPasswordImports = [
  ReactiveFormsModule,
  ButtonModule,
  PhoneNumberInputComponent,
  HeaderComponent,
  TranslateModule,
  ControlErrorsModule,
  NgIf,
];
