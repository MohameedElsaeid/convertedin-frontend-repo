import { Pagination } from '@redmose/shared/models/interfaces';
import { Customer } from './customer.interface';

export interface Customers extends Pagination {
  data: Array<Customer>;

  customers_sheet: {
    status?: 'pending' | 'uploaded' | 'failed';
    userHasAccessToImportCustomersSheet: boolean;
  };
}
