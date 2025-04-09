import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NoStoreConnectedEmptyStateComponent,
  SpinnerComponent,
} from '@redmose/shared/components';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { CustomerCsvImportComponent } from './components/customer-csv-import/customer-csv-import.component';
import { TranslateModule } from '@ngx-translate/core';

export const segmentCustomerImports = [
  CommonModule,
  TableModule,
  PaginatorModule,
  SpinnerComponent,
  AutoCompleteModule,
  FormsModule,
  ButtonModule,
  MultiSelectModule,
  CustomerCsvImportComponent,
  NoStoreConnectedEmptyStateComponent,
  TranslateModule,
];
