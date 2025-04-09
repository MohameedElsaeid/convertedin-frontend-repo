import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { paymentCodeImports } from './imports';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@ngx-translate/core';
import {
  Observable,
  Subject,
  catchError,
  finalize,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import {
  WalletActions,
  WalletState,
  selectAllWallet,
} from '@flyerz/store/wallet';
import { Store } from '@ngrx/store';
import { PaymentMethodCode, UserData, WalletApi } from '@flyerz/shared/api';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import { SuccessPopupComponent } from '@flyerz/shared/components';
import { selectUserData } from '@flyerz/store/app';

@Component({
  selector: 'convertedin-payment-code',
  standalone: true,
  imports: paymentCodeImports,
  templateUrl: './payment-code.component.html',
  styleUrls: ['./payment-code.component.scss'],
})
export class PaymentCodeComponent implements OnInit, OnDestroy {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column flex-grow-1';

  private __unsubscriber: Subject<void> = new Subject();
  redirect: { show: boolean; url: string } = { show: false, url: '' };
  isLoading: boolean = false;
  paymentData$!: Observable<WalletState>;
  userData$!: Observable<UserData | undefined>;
  form: FormGroup = this.__formBuilder.group({
    value: [
      null,
      [
        RxwebValidators.required({
          message: this.__transalte.instant('common-form-validations.required'),
        }),
      ],
    ],
  });
  //#endregion

  constructor(
    private __formBuilder: FormBuilder,
    private __transalte: TranslateService,
    private __store: Store,
    private __walletApi: WalletApi,
    private __router: Router,
    private __toast: MessageService,
    private __dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.paymentData$ = this.__store.select(selectAllWallet).pipe(
      tap((data) => {
        if (!data.budget || !data.paymentMethod) {
          this.__router.navigate(['/my-dashboard/wallet']);
        }
      })
    );

    this.userData$ = this.__store.select(selectUserData);
  }

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
    this.__store.dispatch(WalletActions.resetState());
  }

  recharge(paymentData: WalletState): void {
    this.isLoading = true;

    this.__walletApi
      .rechargeWallet(
        paymentData.budget!,
        paymentData.paymentMethod!.id,
        paymentData.paymentMethod!.code,
        this.form.value.value.countryCode,
        this.form.value.value.number
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
        if (paymentData.paymentMethod?.code === PaymentMethodCode.FAWRY) {
          this.openSuccessPopup();
        } else {
          const newWin = window.open(data.iFrame, '_blank');
          this.redirect.show = true;
          this.redirect.url = data.iFrame;
          const timeout = setTimeout(() => {
            this.__router.navigate(['/my-dashboard/wallet']);
            clearTimeout(timeout);
          }, 5000);
        }
      });
  }

  openSuccessPopup(): void {
    this.__dialog.open(SuccessPopupComponent, {
      styleClass: 'success-popup',
      data: {
        title: 'dashboard.wallet.fawry-popup.title',
        subtitle: 'dashboard.wallet.fawry-popup.subtitle',
        route: '/my-dashboard/wallet',
        btnText: 'common.okay',
      },
      closable: false,
    });
  }
}
