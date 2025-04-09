import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent, SpinnerComponent } from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

export const categoriesImports = [
  CommonModule,
  TranslateModule,
  InputTextModule,
  FormsModule,
  HeaderComponent,
  ButtonModule,
  SpinnerComponent,
];
