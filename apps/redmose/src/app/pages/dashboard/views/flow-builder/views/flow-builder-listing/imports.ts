import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  NoStoreConnectedEmptyStateComponent,
  SpinnerComponent,
} from '@redmose/shared/components';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ListRowComponent } from './components/list-row/list-row.component';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { TranslateModule } from '@ngx-translate/core';

export const flowBuilderListingImports = [
  CommonModule,
  ButtonModule,
  TableModule,
  RouterModule,
  SpinnerComponent,
  ListRowComponent,
  DropdownModule,
  PaginatorModule,
  NoStoreConnectedEmptyStateComponent,
  TranslateModule,
];
