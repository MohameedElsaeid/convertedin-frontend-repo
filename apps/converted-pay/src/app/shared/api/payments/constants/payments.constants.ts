import { ApiConstants } from '@converted-pay/shared/constants';

export class PaymentsEndpoints {
  // Payment methods endpoint
  static readonly GET_PAYMENT_METHODS =
    ApiConstants.INITIAL + '/payments/methods';
  // Recharge bank transfer endpoint
  static readonly GET_RECHARGE_BANK_TRANSFER =
    ApiConstants.INITIAL + '/payments/bank/transfer/info';
  // Recharge endpoint
  static readonly RECHARGE = ApiConstants.INITIAL + '/payments/recharge';
  // Get transactions endpoint
  static readonly GET_TRANSACTIONS = ApiConstants.INITIAL + '/transactions';
  // Get payment configurations
  static readonly GET_PAYMENT_CONFIGURATIONS =
    ApiConstants.INITIAL + '/payments/configurations';
  // Upload bank receipt endpoint
  static readonly UPLOAD_BANK_RECEIPT =
    ApiConstants.INITIAL + '/payments/bank/transfer';
  // Get recharge validation endpoint
  static readonly GET_RECHARGE_VALIDATION =
    ApiConstants.INITIAL + '/validations/recharge';
}
