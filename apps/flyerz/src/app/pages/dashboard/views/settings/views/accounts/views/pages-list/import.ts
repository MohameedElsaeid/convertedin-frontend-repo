import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent, SpinnerComponent } from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';

export const pagesListImports = [
  CommonModule,
  ButtonModule,
  InputTextModule,
  HeaderComponent,
  TranslateModule,
  FormsModule,
  RadioButtonModule,
  SpinnerComponent,
];
