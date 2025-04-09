import {
  ApiResponse,
  MetaPayload,
} from '@converted-pay/shared/models/interfaces';
import { Observable } from 'rxjs';
import {
  BankAccount,
  BankReceiptPayload,
  PaymentConfigurations,
  PaymentMethod,
  PaymentResponse,
  RechargePayload,
  RechargeValidation,
  Transactions,
} from '../models/interfaces';
import { Upload } from '@converted-pay/shared/utilities/upload-file';

export abstract class PaymentsApi {
  abstract getPaymentMethods(): Observable<ApiResponse<Array<PaymentMethod>>>;

  abstract getRechargeBankTransfer(): Observable<
    ApiResponse<Array<BankAccount>>
  >;

  abstract recharge(
    rechargePayload: RechargePayload
  ): Observable<ApiResponse<PaymentResponse>>;

  abstract getTransactions(
    metaPayload: MetaPayload
  ): Observable<ApiResponse<Transactions>>;

  abstract getPaymentConfigurations(): Observable<PaymentConfigurations>;

  abstract submitBankReceipt(
    bankReceiptPayload: BankReceiptPayload
  ): Observable<Upload>;

  abstract getValidations(): Observable<ApiResponse<RechargeValidation>>;
}
