import { ApiConstants } from '@flyerz/shared/constants';

export class WalletConstants {
  // User transactions endpoint
  static readonly GET_TRANSACTIONS =
    ApiConstants.INITIAL +
    ApiConstants.VERSION(1) +
    '/users/wallet/transactions';
  // Get all payment types endpoint
  static readonly GET_PAYMENT_TYPES =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/payments';
  // Gets all blocked transactions
  static readonly GET_BLOCKED_TRANSACTIONS =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/users/blocked/amount';
  // Recharge wallet endpoint
  static readonly RECHARGE_WALLET =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/recharge';
}
