export interface ReferralTransactions {
  balance: Balance;
  transactions: Transactions;
}

interface Balance {
  total: number;
  currentPromotionalWalletBalance: number;
}

interface Transaction {
  id: number;
  type: 'in' | 'out';
  amount: number;
  createdAt: string; // ISO date string
}

interface Transactions {
  count: number;
  date: Transaction[];
}
