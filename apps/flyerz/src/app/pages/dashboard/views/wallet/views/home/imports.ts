// Modules
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
// Components
import {
  InsightsCardComponent,
  SpinnerComponent,
} from '@flyerz/shared/components';
import { WalletTransactionsComponent } from './components/wallet-transactions/wallet-transactions.component';

export const homeImports = [
  CommonModule,
  ButtonModule,
  SpinnerComponent,
  TranslateModule,
  RouterModule,
  InsightsCardComponent,
  WalletTransactionsComponent,
  InfiniteScrollModule,
];
