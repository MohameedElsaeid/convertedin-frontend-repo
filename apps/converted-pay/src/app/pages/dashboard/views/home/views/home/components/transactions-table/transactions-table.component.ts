import { Component, Input, OnInit } from '@angular/core';
import { AsyncPipe, DecimalPipe, NgClass, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import {
  PaymentsApi,
  TransactionItem,
  TransactionPagination,
  TransactionsStatistics,
  providePaymentsApi,
} from '@converted-pay/shared/api';
import { RouterLink } from '@angular/router';
import { finalize, map, Observable, startWith, tap } from 'rxjs';
import { MetaPayload } from '@converted-pay/shared/models/interfaces';
import { PaginatorModule } from 'primeng/paginator';
import { TranslateModule } from '@ngx-translate/core';
import {
  CurrencyComponent,
  ImageViewDialogComponent,
} from '@converted-pay/shared/components';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-transactions-table',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    ButtonModule,
    TableModule,
    DatePipe,
    RouterLink,
    AsyncPipe,
    DecimalPipe,
    PaginatorModule,
    TranslateModule,
    CurrencyComponent,
  ],
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
  providers: [providePaymentsApi()],
})
export class TransactionsTableComponent implements OnInit {
  @Input() showTransactionsTable!: boolean;
  @Input() disableTopup!: boolean;
  transactions$!: Observable<{
    transactions: Array<TransactionItem>;
    pagination: TransactionPagination;
  }>;
  statistics!: TransactionsStatistics;
  metaPayload: MetaPayload = {
    page: 1,
    per_page: 10,
  };
  isLoading = false;
  pageLinkSize: number;

  constructor(
    private __paymentsApi: PaymentsApi,
    private dialog: DialogService
  ) {
    this.pageLinkSize = window.innerWidth <= 768 ? 2 : 3;
  }

  ngOnInit(): void {
    this.getTransactions();
  }
  getTransactions() {
    this.isLoading = true;
    this.transactions$ = this.__paymentsApi
      .getTransactions(this.metaPayload)
      .pipe(
        map((res) => res.data),
        tap((res) => {
          this.statistics = res.statistics;
        }),
        finalize(() => {
          this.isLoading = false;
        }),
        startWith({ transactions: [], pagination: { total: 0 } })
      );
  }

  onPageChange(e: any) {
    if (this.metaPayload.page == e.page + 1) return;
    this.metaPayload.page = e.page! + 1;
    this.getTransactions();
  }
  openImageViewer(url: string, transactionRef: string) {
    this.dialog.open(ImageViewDialogComponent, {
      showHeader: false,
      data: {
        imageUrl: url,
        transactionRef,
      },
    });
  }
}
