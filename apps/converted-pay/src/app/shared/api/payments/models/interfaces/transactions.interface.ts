import { TransactionItem } from './transaction-item.interface';

export interface Transactions {
  statistics: TransactionsStatistics;
  transactions: Array<TransactionItem>;
  pagination: TransactionPagination;
}
export interface TransactionsStatistics {
  totalChargeAmount: number;
  connectedAccounts: number;
}

export interface TransactionPagination {
  total: number;
  per_page?: number;
  current_page?: number;
  last_page?: number;
  from?: number;
  to?: number;
}
