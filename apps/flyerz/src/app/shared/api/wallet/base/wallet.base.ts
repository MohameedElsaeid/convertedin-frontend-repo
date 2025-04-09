import { Observable } from 'rxjs';
import { UserTransaction } from '../models/interfaces/user-transactions.interface';
import { Payments, RechargeWallet } from '../models/interfaces';

export abstract class WalletApi {
  /**
   * Recharges wallet with mentioned amount
   * @param budget Amount to be recharged
   * @param paymentId Payment id
   * @param payment_code Payment code
   * @param countryCode Country code of recharge account (in case if payment_code is 3124654 or 4054986 or 13 or 14)
   * @param phone Phone number of recharge account (in case if payment_code is 3124654 or 4054986 or 13 or 14)
   */
  abstract rechargeWallet(
    budget: number,
    paymentId: number,
    payment_code: number,
    countryCode?: string,
    phone?: string
  ): Observable<{ data: RechargeWallet }>;

  /**
   * Gets list of user wallet transactions
   * @param offset Data offset
   * @param status Filter by ad status
   * @param limit Max number of objects
   * @param transaction Type of transaction to filter with ('in' or 'out')
   */
  abstract getUserTransactions(
    offset: number | string,
    status: number | string,
    limit: number | string,
    transaction?: 'in' | 'out'
  ): Observable<{ data: UserTransaction }>;

  /**
   * Gets a list of bloacked transactions
   * @param offset Data offset
   * @param limit Max number of objects
   */
  abstract getBlockedTransactions(
    offset: number | string,
    limit: number | string
  ): Observable<{ data: UserTransaction }>;

  /**
   * Gets a list of avialable payment methods
   */
  abstract getPaymentMethods(): Observable<{ data: Payments }>;
}
