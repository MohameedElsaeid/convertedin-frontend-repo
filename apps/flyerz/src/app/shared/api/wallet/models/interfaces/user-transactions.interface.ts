import { Transaction } from './transaction.interface';

export interface UserTransaction {
  currentBalance: {
    currentBalance?: string;
    totalCharged?: string;
    totalSpend?: string;
    availableForRefund?: string;
    totalPromotionalBalance?: string;
    totalBlockedBalance?: string;
  };
  transactions: Array<Transaction>;
}
