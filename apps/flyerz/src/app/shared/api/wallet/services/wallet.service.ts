import { Injectable } from '@angular/core';
import { WalletApi } from '../base/wallet.base';
import { QueryApi } from '@convertedin/api';
import { Observable } from 'rxjs';
import { UserTransaction } from '../models/interfaces/user-transactions.interface';
import { WalletConstants } from '../constants/wallet.constant';
import { Payments, RechargeWallet } from '../models/interfaces';

@Injectable()
export class WalletApiService extends WalletApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override rechargeWallet(
    budget: number,
    paymentId: number,
    payment_code: number,
    countryCode?: string | undefined,
    phone?: string | undefined
  ): Observable<{ data: RechargeWallet }> {
    return this.__queryApi.post(WalletConstants.RECHARGE_WALLET, {
      budget,
      paymentId,
      payment_code,
      countryCode,
      phone,
    });
  }

  override getBlockedTransactions(
    offset: string | number,
    limit: string | number
  ): Observable<{ data: UserTransaction }> {
    return this.__queryApi.get(WalletConstants.GET_BLOCKED_TRANSACTIONS, {
      params: {
        offset,
        limit,
      },
    });
  }

  override getPaymentMethods(): Observable<{ data: Payments }> {
    return this.__queryApi.get(WalletConstants.GET_PAYMENT_TYPES);
  }

  override getUserTransactions(
    offset: number | string,
    transactionType: number | string,
    limit: number | string,
    transaction?: 'in' | 'out'
  ): Observable<{ data: UserTransaction }> {
    return this.__queryApi.get(WalletConstants.GET_TRANSACTIONS, {
      params: {
        offset,
        transactionType,
        limit,
        transaction: transaction ?? '',
      },
    });
  }
}
