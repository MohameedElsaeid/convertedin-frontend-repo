import { Injectable } from '@angular/core';
import { PaymentsApi } from '../base/payments.base';
import { QueryApi } from '@convertedin/api';
import { Observable, map, scan } from 'rxjs';
import { PaymentsEndpoints } from '../constants/payments.constants';
import {
  BankAccount,
  BankReceiptPayload,
  PaymentConfigurations,
  PaymentMethod,
  PaymentResponse,
  RechargePayload,
  RechargeValidation,
  RechargeValidationItem,
  Transactions,
} from '../models/interfaces';
import {
  ApiResponse,
  MetaPayload,
} from '@converted-pay/shared/models/interfaces';
import {
  Upload,
  calculateState,
  initialUploadState,
} from '@converted-pay/shared/utilities/upload-file';

@Injectable()
export class PaymentsApiService extends PaymentsApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override getPaymentConfigurations(): Observable<PaymentConfigurations> {
    return this.__queryApi.get(PaymentsEndpoints.GET_PAYMENT_CONFIGURATIONS);
  }

  override getPaymentMethods(): Observable<ApiResponse<Array<PaymentMethod>>> {
    return this.__queryApi.get(PaymentsEndpoints.GET_PAYMENT_METHODS);
  }

  override getRechargeBankTransfer(): Observable<
    ApiResponse<Array<BankAccount>>
  > {
    return this.__queryApi.get(PaymentsEndpoints.GET_RECHARGE_BANK_TRANSFER);
  }

  override getTransactions(
    metaPayload: MetaPayload
  ): Observable<ApiResponse<Transactions>> {
    return this.__queryApi.get(PaymentsEndpoints.GET_TRANSACTIONS, {
      params: { ...metaPayload },
    });
  }

  override recharge(
    rechargePayload: RechargePayload
  ): Observable<ApiResponse<PaymentResponse>> {
    return this.__queryApi.post(PaymentsEndpoints.RECHARGE, rechargePayload);
  }

  override submitBankReceipt(
    bankReceiptPayload: BankReceiptPayload
  ): Observable<Upload> {
    const formData = new FormData();
    formData.append('bankTransferProof', bankReceiptPayload.bankTransferProof);
    formData.append('invoiceId', bankReceiptPayload.invoiceId);

    return this.__queryApi
      .post(PaymentsEndpoints.UPLOAD_BANK_RECEIPT, formData, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(scan(calculateState, initialUploadState));
  }

  override getValidations(): Observable<ApiResponse<RechargeValidation>> {
    return this.__queryApi.get(PaymentsEndpoints.GET_RECHARGE_VALIDATION);
  }
}
