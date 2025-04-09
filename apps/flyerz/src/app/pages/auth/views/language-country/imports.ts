import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { HeaderComponent, SpinnerComponent } from '@flyerz/shared/components';
import { ControlErrorsModule } from '@convertedin/ui';

export const languageCountryImports = [
  CommonModule,
  ReactiveFormsModule,
  DropdownModule,
  ButtonModule,
  TranslateModule,
  ProgressSpinnerModule,
  SpinnerComponent,
  HeaderComponent,
  ControlErrorsModule,
];
