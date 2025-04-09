import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { CustomBudgetEstimatedClicksPipe, DailyBudgetPipe } from '../../pipes';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ControlErrorsModule } from '@convertedin/ui';
import { SliderModule } from 'primeng/slider';

export const campaignBudgetImports = [
  CommonModule,
  TranslateModule,
  TooltipModule,
  ProgressSpinnerModule,
  DailyBudgetPipe,
  RadioButtonModule,
  FormsModule,
  ReactiveFormsModule,
  InputNumberModule,
  ControlErrorsModule,
  CustomBudgetEstimatedClicksPipe,
  SliderModule
];
