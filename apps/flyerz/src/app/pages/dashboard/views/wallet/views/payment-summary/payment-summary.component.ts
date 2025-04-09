import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { paymentSummaryImports } from './imports';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subject,
  catchError,
  delay,
  finalize,
  map,
  startWith,
  take,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import {
  selectCurrency,
  selectUserData,
  selectValidations,
} from '@flyerz/store/app';
import { TranslateService } from '@ngx-translate/core';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import {
  WalletActions,
  WalletState,
  selectAllWallet,
} from '@flyerz/store/wallet';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AuthApi,
  PaymentMethodCode,
  UserData,
  Validations,
  WalletApi,
} from '@flyerz/shared/api';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-payment-summary',
  standalone: true,
  imports: paymentSummaryImports,
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss'],
})
export class PaymentSummaryComponent implements OnInit, OnDestroy {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column flex-grow-1';

  get dir() {
    return document.documentElement.dir;
  }
  readonly charges = 0.15;
  readonly vat = 0.14;
  readonly SaudiVat = 0.15;
  private __unsubscriber: Subject<void> = new Subject();
  currentVat: number = this.vat;

  isLoading: boolean = false;
  currency$!: Observable<string | undefined>;
  value$!: Observable<any>;
  paymentData$!: Observable<WalletState>;
  validations$!: Observable<Validations | undefined>;
  userData$!: Observable<UserData | undefined>;
  redirect: { show: boolean; url: string } = { show: false, url: '' };
  form: FormGroup = this.__formBuilder.group({
    value: [
      null,
      [
        RxwebValidators.required({
          message: this.__translate.instant(
            'dashboard.wallet.payment-summary.amount-error-required'
          ),
        }),
      ],
      [this.valueValidator()],
    ],
  });
  //#endregion

  constructor(
    private __formBuilder: FormBuilder,
    private __store: Store,
    private __translate: TranslateService,
    private __walletApi: WalletApi,
    private __router: Router,
    private __toast: MessageService,
    private __dialog: DialogService,
  ) {}

  ngOnInit(): void {
    this.currency$ = this.__store.select(selectCurrency);
    this.getPaymentValue();
    this.getPaymentData();

    this.userData$ = this.__store.select(selectUserData).pipe(
      tap(data => {this.currentVat = data?.user.country.key?.toLowerCase() === 'sa' ? this.SaudiVat : this.vat})
    );
    this.validations$ = this.__store.select(selectValidations);
  }

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  getTotalRecharge(amount: number): number {
    const total = Math.floor(amount * (1 + this.currentVat) /*+ this.charges*/);
    return total > 0 ? total : 0.0;
  }

  goToNextStep(paymentData: WalletState, userData: UserData): void {
    !userData.user.email.isVerified &&
    this.isPaymentRequireEmail(paymentData.paymentMethod!.code)
      ? this.validateEmail(userData.user.email.email)
      : this.rechargeAmount(paymentData);
  }

  isPaymentRequireEmail(paymentMethodCode: PaymentMethodCode): boolean {
    return (
      paymentMethodCode === PaymentMethodCode.EBANX ||
      paymentMethodCode === PaymentMethodCode.FAWRY ||
      paymentMethodCode === PaymentMethodCode.PRODUCTION_PAY_MOB_CARD ||
      paymentMethodCode === PaymentMethodCode.STAGE_PAY_MOB_CARD ||
      paymentMethodCode === PaymentMethodCode.STRIPE_CARD
    );
  }

  validateEmail(email: string): void {
    import('../validate-email-popup/validate-email-popup.component').then(
      (component) => {
        this.__dialog.open(component.ValidateEmailPopupComponent, {
          dismissableMask: false,
          styleClass: 'validate-email-popup',
          data: {
            email,
          },
        });
      }
    );
  }

  rechargeAmount(paymentData: WalletState): void {
    const budget = this.form.value['value'];

    switch (paymentData.paymentMethod?.code) {
      case PaymentMethodCode.STRIPE_CARD:
      case PaymentMethodCode.EBANX:
      case PaymentMethodCode.PRODUCTION_PAY_MOB_CARD:
      case PaymentMethodCode.STAGE_PAY_MOB_CARD:
        this.recharge(paymentData, budget);
        break;

      default:
        this.__store.dispatch(WalletActions.setRechargeBudget({ budget }));
        this.__router.navigate(['/my-dashboard/wallet/payment-code']);
        break;
    }
  }

  recharge(paymentData: WalletState, budget: number): void {
    this.isLoading = true;

    this.__walletApi
      .rechargeWallet(
        budget,
        paymentData.paymentMethod!.id,
        paymentData.paymentMethod!.code
      )
      .pipe(
        takeUntil(this.__unsubscriber),
        catchError((error: HttpErrorResponse) => {
          this.__toast.add({
            summary: error.error?.message,
            severity: 'error',
          });
          return throwError(() => error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(({ data }) => {
        const newWin = window.open(data.iFrame, '_blank');
        this.redirect.show = true;
        this.redirect.url = data.iFrame;
        const timeout = setTimeout(() => {
          this.__router.navigate(['/my-dashboard/wallet']);
          clearTimeout(timeout);
        }, 5000);
      });
  }

  getPaymentData(): void {
    this.paymentData$ = this.__store.select(selectAllWallet).pipe(
      tap((data) => {
        if (!data.paymentMethod) {
          this.__router.navigate(['/my-dashboard/wallet']);
        }
      })
    );
  }

  getPaymentValue(): void {
    this.value$ = this.form.valueChanges.pipe(
      delay(300),
      startWith({ value: 0.0 })
    );
  }

  valueValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.validations$.pipe(
        map((validations) => {
          const isValid =
            validations?.recharge?.minAmount &&
            control.value >= validations.recharge.minAmount;

          return control.dirty
            ? isValid
              ? null
              : {
                  invalid: {
                    message: `${this.__translate.instant(
                      'dashboard.wallet.payment-summary.amount-error-minvalue'
                    )} ${validations?.recharge?.minAmount} ${
                      validations?.currency?.symbol
                    }`,
                  },
                }
            : null;
        }),
        take(1)
      );
    };
  }
  //#endregion
}
