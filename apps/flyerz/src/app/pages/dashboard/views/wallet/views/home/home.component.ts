import { Component, HostBinding, OnInit } from '@angular/core';
import {
  Transaction,
  TransactionState,
  TransactionType,
  UserTransaction,
  WalletApi,
} from '@flyerz/shared/api';
import { selectCurrency } from '@flyerz/store/app';
import { Store } from '@ngrx/store';
import { Observable, finalize, tap } from 'rxjs';
import { homeImports } from './imports';
import { PaginationService } from '@flyerz/shared/services';

@Component({
  selector: 'convertedin-home',
  standalone: true,
  imports: homeImports,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PaginationService],
})
export class HomeComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex-grow-1 flex flex-column max-h-full';

  currency$!: Observable<string | undefined>;
  loaders: any = {
    isLoading: true,
    isTransactionLoading: true,
    isBlockedLoading: true,
  };
  walletData$!: Observable<{ data: UserTransaction }>;
  transactions$!: Observable<{ data: UserTransaction }>;
  blockedData$!: Observable<{ data: UserTransaction }>;

  get transactionState() {
    return TransactionState;
  }
  get transactionType() {
    return TransactionType;
  }
  //#endregion

  constructor(
    private __store: Store,
    private __wallet: WalletApi,
    protected _pagination: PaginationService<Transaction>
  ) {}

  ngOnInit(): void {
    this._pagination.init(TransactionType.ALL);
    this.currency$ = this.__store.select(selectCurrency);
    this.walletData$ = this.getWalletData('isLoading');
    this.transactions$ = this.getWalletData('isTransactionLoading');
    this.blockedData$ = this.getWalletData('isBlockedLoading', true);
  }

  //#region Methods
  getWalletData(
    loaderKey: string,
    isBlocked: boolean = false,
    transaction?: TransactionState
  ): Observable<{ data: UserTransaction }> {
    this.loaders[loaderKey] = true;
    return (
      isBlocked
        ? this.__wallet.getBlockedTransactions(
            this._pagination.pagination.offset,
            this._pagination.pagination.limit
          )
        : this.__wallet.getUserTransactions(
            this._pagination.pagination.offset,
            this._pagination.pagination.sort,
            this._pagination.pagination.limit,
            transaction
          )
    ).pipe(
      tap(({ data }) => {
        this._pagination.processData(data.transactions);
      }),
      finalize(() => {
        this.loaders[loaderKey] = false;
      })
    );
  }

  sortTransactions(sortIndex: TransactionType): void {
    this.resetPagination(sortIndex);
    this.transactions$ = this.getWalletData(
      'isTransactionLoading',
      sortIndex === TransactionType.BLOCKED_AMOUNT
    );
  }

  resetPagination(sortIndex?: TransactionType): void {
    this._pagination.resetPagination();
    this._pagination.pagination.sort = sortIndex || TransactionType.ALL;
  }

  scrolled(): void {
    if (!this._pagination.pagination.reachedTotalCount) {
      this.transactions$ = this.getWalletData(
        'isTransactionLoading',
        this._pagination.pagination.sort === TransactionType.BLOCKED_AMOUNT
      );
    }
  }

  sortTransactionsByState(transaction: TransactionState): void {
    this.resetPagination();
    this.transactions$ = this.getWalletData(
      'isTransactionLoading',
      false,
      transaction
    );
  }

  isZeroAmount(value: string): boolean {
    return parseInt(value) === 0;
  }
  //#endregion
}
