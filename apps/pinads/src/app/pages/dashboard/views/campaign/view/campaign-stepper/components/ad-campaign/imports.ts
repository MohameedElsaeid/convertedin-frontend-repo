import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TranslateModule } from '@ngx-translate/core';
import { SuggestionsButtonComponent } from '../suggestions-button/suggestions-button.component';
import { ControlErrorsModule } from '@convertedin/ui';

export const adCampaignImports = [
  CommonModule,
  ReactiveFormsModule,
  SuggestionsButtonComponent,
  InputTextModule,
  TranslateModule,
  ControlErrorsModule,
];
