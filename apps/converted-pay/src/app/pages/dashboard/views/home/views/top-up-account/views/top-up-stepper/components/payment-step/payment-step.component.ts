import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, KeyValuePipe, NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import {
  BankPaymentStepComponent,
  FawryPaymentStepComponent,
  VodafonPaymentStepComponent,
} from './components';
import { Store } from '@ngrx/store';
import { Observable, finalize, map } from 'rxjs';
import {
  RechargeActions,
  selectRechargeAmountDetails,
} from '@converted-pay/store/recharge';
import {
  BankAccount,
  PaymentConfigurations,
  PaymentMethod,
  PaymentsApi,
} from '@converted-pay/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyComponent, SpinnerComponent } from '@converted-pay/shared/components';
@Component({
  selector: 'convertedin-payment-step',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ProgressBarModule,
    BankPaymentStepComponent,
    VodafonPaymentStepComponent,
    FawryPaymentStepComponent,
    NgFor,
    SpinnerComponent,
    TranslateModule,
    CurrencyComponent
  ],
  templateUrl: './payment-step.component.html',
  styleUrls: ['./payment-step.component.scss'],
})
export class PaymentStepComponent implements OnInit {
  @Input() selectedPaymentMethod!: PaymentMethod;
  bankList: BankAccount[] = [];
  readonly PAYMENT_METHOD = {
    credit: '1',
    bank: '2',
    vodafonCash: '3',
    fawry: '4',
  };

  paymentDetails$!: Observable<{
    rechargeAmount: number | undefined;
    fees: PaymentConfigurations | undefined;
    agencyFee: number | undefined;
    vatFee: number | undefined;
    totalAmount: number | undefined;
  }>;
  paymentMethods$!: Observable<Array<PaymentMethod>>;
  isLoading = true;

  constructor(private __store: Store, private __paymentApi: PaymentsApi) {}

  ngOnInit(): void {
    this.paymentDetails$ = this.__store.select(selectRechargeAmountDetails);
    this.paymentMethods$ = this.__paymentApi.getPaymentMethods().pipe(
      map((res) => res.data),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
  setBankList(val: BankAccount[]) {
    this.bankList = val;
  }
  onSelectPayment(method: PaymentMethod): void {
    if (this.selectedPaymentMethod?.id !== method.id) {
      this.selectedPaymentMethod = method;
      this.__store.dispatch(
        RechargeActions.setRechargePaymentMethod({ paymentMethod: method })
      );
    }
  }
}
