import { Component, HostBinding, OnInit } from '@angular/core';
import { paymentMethodImports } from './imports';
import { Observable, finalize } from 'rxjs';
import {
  ConnectionDetails,
  PaymentMethod,
  Payments,
  WalletApi,
} from '@flyerz/shared/api';
import { Store } from '@ngrx/store';
import { WalletActions } from '@flyerz/store/wallet';
import { Router } from '@angular/router';

@Component({
  selector: 'convertedin-payment-method',
  standalone: true,
  imports: paymentMethodImports,
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class =
    'flex flex-column flex-grow-1 gap-4 dashboard-wallet__add-funds';

  payments$!: Observable<{ data: Payments }>;
  isLoading: boolean = true;
  selectedMethod!: PaymentMethod;
  userConnection$!: Observable<ConnectionDetails | undefined>;
  //#endregion

  constructor(
    private __walletApi: WalletApi,
    private __store: Store,
    private __router: Router
  ) {}

  ngOnInit(): void {
    this.payments$ = this.__walletApi.getPaymentMethods().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
    this.__store.dispatch(WalletActions.resetState());
  }

  //#region Methods
  paymentSelect(method: PaymentMethod): void {
    if (method.status.id !== 0) {
      this.selectedMethod = method;
      this.__store.dispatch(
        WalletActions.setPaymentMethod({ paymentMethod: method })
      );
    }
  }

  goToNextStep(): void {
    this.__router.navigate(['/my-dashboard/wallet/funds-summary']);
  }
  //#endregion
}
