import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlErrorsModule } from '@convertedin/ui';
import { CurrencyInputComponent } from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { WalletValueBannerComponent } from '../wallet-value-banner/wallet-value-banner.component';

export const periodBudgetPopupImports = [
  CommonModule,
  CurrencyInputComponent,
  InputNumberModule,
  ButtonModule,
  TranslateModule,
  ReactiveFormsModule,
  ControlErrorsModule,
  WalletValueBannerComponent,
];
