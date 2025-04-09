import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { Store } from '@ngrx/store';
import {
  PaymentsApi,
  RechargeValidationItem,
  SocialAccount,
} from '@converted-pay/shared/api';
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs';
import {
  RechargeActions,
  rechargeFeature,
  selectTotalAmount,
} from '@converted-pay/store/recharge';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  CurrencyComponent,
  SpinnerComponent,
} from '@converted-pay/shared/components';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ControlErrorsModule } from '@convertedin/ui';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputNumberModule } from 'primeng/inputnumber';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { selectCurrency } from '@converted-pay/store/app';
import { DialogService } from 'primeng/dynamicdialog';
import { VatDialogComponent } from '../vat-dialog/vat-dialog.component';
@Component({
  selector: 'convertedin-change-amount-step',
  standalone: true,
  imports: [
    InputTextModule,
    ProgressBarModule,
    ReactiveFormsModule,
    DecimalPipe,
    NgIf,
    AsyncPipe,
    SpinnerComponent,
    NgFor,
    ControlErrorsModule,
    InputSwitchModule,
    InputNumberModule,
    TranslateModule,
    CurrencyComponent,
  ],
  templateUrl: './change-amount-step.component.html',
  styleUrls: ['./change-amount-step.component.scss'],
})
export class ChangeAmountStepComponent implements OnInit, OnDestroy {
  @Input() amount!: number;
  @Input() usePromotionalBalance!: boolean;
  @Output() onchangeState = new EventEmitter<boolean>();
  activeChannel$!: Observable<SocialAccount | undefined>;
  paymentCharges$!: Observable<RechargeValidationItem>;
  totalAmount$!: Observable<{ totalAmount: number }>;
  form: FormGroup = new FormGroup({
    amount: new FormControl(
      null,
      RxwebValidators.required({
        message: this.translate.instant('validations.amount.required'),
      })
    ),
    usePromotionalBalance: new FormControl(),
  });
  userPromotionalWalletBalance!: number;
  isLoading = true;
  vatFee = 0;
  agencyFee = 0;
  totalAmount = 0;
  paymentConfig!: RechargeValidationItem;
  currency$ = this.__store.select(selectCurrency);
  constructor(
    private __store: Store,
    private __paymentApi: PaymentsApi,
    private destroyRef: DestroyRef,
    private translate: TranslateService,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.activeChannel$ = this.__store.select(
      rechargeFeature.selectSocialAccount
    );
    this.form.patchValue({
      amount: this.amount,
      usePromotionalBalance: this.usePromotionalBalance,
    });

    this.totalAmount$ = this.__store.select(selectTotalAmount);
    this.onValueChange();
    this.getPaymentConfig();
    this.subscribeFormState();
  }
  subscribeFormState() {
    this.form.statusChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => {
        if (status === 'VALID') this.onchangeState.emit(true);
        else this.onchangeState.emit(false);
      });
  }
  onValueChange(): void {
    this.form.valueChanges
      .pipe(debounceTime(500), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.updateFees(value.amount);
        this.usePromotionalBalance = value.usePromotionalBalance;
      });
  }

  getPaymentConfig(): void {
    this.__store
      .select(rechargeFeature.selectSocialAccount)
      .pipe(
        switchMap((selectedAccount) =>
          this.__paymentApi.getValidations().pipe(
            tap((res) => {
              this.userPromotionalWalletBalance =
                res.data.userPromotionalWalletBalance;
            }),
            map(
              (res) =>
                res.data.channels.find(
                  (item) => item.channelId === selectedAccount!.id
                )!
            ),
            tap((accountValidation) => {
              const value = accountValidation?.minimumRechargeAmount;
              if (value)
                this.form.controls['amount'].addValidators(
                  RxwebValidators.minNumber({
                    value,
                    message: this.translate.instant(
                      'validations.amount.minimum',
                      { value }
                    ),
                  })
                );
            }),
            finalize(() => {
              this.isLoading = false;
            })
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => {
        this.paymentConfig = res;
        this.updateFees(this.amount);
      });
  }

  openVatDialog() {
    this.dialog.open(VatDialogComponent, {
      showHeader: false,
      data: { vat: this.paymentConfig.vat },
    });
  }

  updateFees(value: number) {
    this.amount = value;
    this.agencyFee = this.calculateAgencyFees(value);
    this.vatFee = value ? (this.paymentConfig.vat / 100) * value : 0;
    this.totalAmount = value ? value + this.agencyFee + this.vatFee : 0;
  }
  calculateAgencyFees(value: number) {
    if (!value) return 0;
    if (this.paymentConfig.userPercentage) {
      return (this.paymentConfig.userPercentage / 100) * value;
    }
    const foundPercentage = this.paymentConfig.percentages.find(
      (percentage) => {
        return value >= percentage.from && value <= percentage.to;
      }
    );

    if (foundPercentage) {
      return (foundPercentage.percentage / 100) * value;
    }
    const firstConfig = this.paymentConfig.percentages[0];
    const lastConfig =
      this.paymentConfig.percentages[this.paymentConfig.percentages.length - 1];
    return firstConfig.from > value
      ? (firstConfig.percentage / 100) * value
      : (lastConfig.percentage / 100) * value;
  }
  ngOnDestroy(): void {
    this.__store.dispatch(
      RechargeActions.setRechargeAmount({
        rechargeAmount: this.amount,
        agencyFee: this.agencyFee,
        vatFee: this.vatFee,
        totalAmount: this.totalAmount,
        usePromotionalBalance: this.usePromotionalBalance,
      })
    );
  }
}
