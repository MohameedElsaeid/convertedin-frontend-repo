import { TransactionType } from '../enums';

export interface Transaction {
  id: number;
  amount: string;
  totalAmount: string;
  type: {
    id: TransactionType;
    name: string;
  };
  transaction: string;
  createdAt: string;
  cashbackIncluded: boolean;
  currency: {
    id: number;
    name: string;
    symbol: string;
  };
  payment?: {
    id: number;
    name: string;
    icon: string;
    paymentId: number;
    amount: number;
    cashbackIncluded: boolean;
    expiredAt: string;
    cashbackAmount: number;
    amountAfterCommission: number;
    paidAt: string;
  };
  ad?: {
    id: number;
    referenceNo: string;
    budget: number;
    spend: number;
    days: number;
    image: string;
    type: {
      id: number;
      name: string;
    };
    status: {
      id: number;
      name: string;
    };
  };
  refund?: { id: number };
  promoCode?: {};
}
