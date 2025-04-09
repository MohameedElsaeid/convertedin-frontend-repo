import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  ControlErrorsModule,
  PhoneNumberInputComponent,
} from '@convertedin/ui';
import { SpinnerComponent } from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

export const profileImports = [
  CommonModule,
  InputTextModule,
  PhoneNumberInputComponent,
  ButtonModule,
  TranslateModule,
  ReactiveFormsModule,
  ControlErrorsModule,
  SpinnerComponent,
  RouterLink,
  TooltipModule,
  DividerModule,
];
