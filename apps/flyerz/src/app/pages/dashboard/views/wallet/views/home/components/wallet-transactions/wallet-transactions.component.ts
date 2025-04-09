import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  Transaction,
  TransactionState,
  TransactionType,
} from '@flyerz/shared/api';
import { DropdownItem } from '@flyerz/shared/models/interfaces';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-wallet-transactions',
  templateUrl: './wallet-transactions.component.html',
  styleUrls: ['./wallet-transactions.component.scss'],
  standalone: true,
  imports: [
    ButtonModule,
    TranslateModule,
    CommonModule,
    DropdownModule,
    FormsModule,
    RouterModule,
  ],
})
export class WalletTransactionsComponent {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column flex-grow-1 gap-4';
  @Input({ required: true }) transactions!: Array<Transaction>;
  @Input({ required: true }) activeSort!: TransactionType;
  @Output() sortChange: EventEmitter<TransactionType> = new EventEmitter();

  items: Array<DropdownItem> = [
    {
      label: this.__translate.instant('dashboard.wallet.wallet-sorting.all'),
      value: TransactionType.ALL,
    },
    {
      label: this.__translate.instant('dashboard.wallet.wallet-sorting.ad'),
      value: TransactionType.AD,
    },
    {
      label: this.__translate.instant('dashboard.wallet.wallet-sorting.promo'),
      value: TransactionType.PROMO_CODE,
    },
    {
      label: this.__translate.instant('dashboard.wallet.wallet-sorting.review'),
      value: TransactionType.REVIEW,
    },
    {
      label: this.__translate.instant(
        'dashboard.wallet.wallet-sorting.dashboard'
      ),
      value: TransactionType.DASHBOARD,
    },
    {
      label: this.__translate.instant('dashboard.wallet.wallet-sorting.refund'),
      value: TransactionType.REFUND,
    },
    {
      label: this.__translate.instant(
        'dashboard.wallet.wallet-sorting.referral'
      ),
      value: TransactionType.REFERRAL,
    },
    {
      label: this.__translate.instant(
        'dashboard.wallet.wallet-sorting.blocked'
      ),
      value: TransactionType.BLOCKED_AMOUNT,
    },
    {
      label: this.__translate.instant(
        'dashboard.wallet.wallet-sorting.recharge'
      ),
      value: TransactionType.RECHARGE,
    },
  ];
  //#endregion

  constructor(
    private __translate: TranslateService,
    private __dialog: DialogService
  ) {}

  //#region Methods
  sortChanged(): void {
    this.sortChange.emit(this.activeSort);
  }

  showDetails(item: Transaction): void {
    import(
      '../../../transaction-details-popup/transaction-details-popup.component'
    ).then((component) => {
      this.__dialog.open(component.TransactionDetailsPopupComponent, {
        dismissableMask: false,
        header: this.__translate.instant(
          'dashboard.wallet.payment-details.title'
        ),
        data: item,
      });
    });
  }

  getCardImg(item: Transaction): string {
    if (item.ad?.id) {
      return item.ad.image;
    }
    if (item.refund?.id) {
      return 'assets/icons/dashboard/wallet/refresh.svg';
    }
    if (item.transaction === TransactionState.OUT) {
      return 'assets/icons/dashboard/wallet/card-send.svg';
    }

    if (item.transaction === TransactionState.IN) {
      return 'assets/icons/dashboard/wallet/added-fund.svg';
    }

    return '';
  }

  getTransactionTitle(item: Transaction): string {
    if (item.refund?.id) {
      return 'dashboard.wallet.returned-amount';
    }
    if (item.transaction === TransactionState.IN) {
      return 'dashboard.wallet.added-amount';
    }
    return 'dashboard.wallet.paid-amount';
  }
  //#endregion
}
