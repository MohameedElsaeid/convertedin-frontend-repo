import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectBusinessBranchCardComponent } from './components';
import { FilterByPipe } from '@pinads/shared/pipes/filter-by.pipe';
import { TranslateModule } from '@ngx-translate/core';
import {
  ControlErrorsModule,
  PhoneNumberInputComponent,
} from '@convertedin/ui';

export const selectBusinessBranchImports = [
  CommonModule,
  ReactiveFormsModule,
  InputTextModule,
  FilterByPipe,
  SelectBusinessBranchCardComponent,
  TranslateModule,
  PhoneNumberInputComponent,
  ControlErrorsModule,
];
