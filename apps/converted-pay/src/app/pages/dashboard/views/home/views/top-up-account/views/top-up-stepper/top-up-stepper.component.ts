import { Component, DestroyRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperModule } from '@convertedin/ui';
import {
  ChangeAmountStepComponent,
  PaymentStepComponent,
  SelectAdAccountStepComponent,
} from './components';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, finalize, take } from 'rxjs';
import {
  RechargeActions,
  RechargeState,
  rechargeFeature,
} from '@converted-pay/store/recharge';
import { PaymentsApi, RechargePayload, UserData } from '@converted-pay/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { LogApi } from '@converted-pay/shared/api/log/base/log.base';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { GuideBannerComponent } from '@converted-pay/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { selectUserData } from '@converted-pay/store/app';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'convertedin-top-up-stepper',
  standalone: true,
  imports: [
    CommonModule,
    StepperModule,
    PaymentStepComponent,
    SelectAdAccountStepComponent,
    ChangeAmountStepComponent,
    GuideBannerComponent,
    TranslateModule
  ],
  templateUrl: './top-up-stepper.component.html',
  styleUrls: ['./top-up-stepper.component.scss'],
})
export class TopUpStepperComponent implements OnInit, OnDestroy {
  rechargeState$!: Observable<RechargeState>;
  isChangeAmountValid = false;
  lastStepIndex = 2;
  nexButtonLabel = 'topUp.next';
  step: any = {
    0: 'Select Ad Account',
    1: 'Charge Amount',
    2: 'Payment',
  };
  isLoading = false;
user!:UserData ;
  constructor(
    private __store: Store,
    private __paymentApi: PaymentsApi,
    private router: Router,
    private logApi: LogApi,
    private activeRoute: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    const { usePromotion } = this.activeRoute.snapshot.queryParams;
    if (usePromotion) {
      this.__store.dispatch(
        RechargeActions.setUsePromotional({ usePromotionalBalance: true })
      );
    }

    this.rechargeState$ = this.__store.select(
      rechargeFeature.selectRechargeState
    );

    this.__store.select(selectUserData).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      if(user)
      this.user = user
    })
  }

  onChangeStep(e: any, rechargeState: RechargeState) {
    this.logApi.trackEvents(this.step[e.index], rechargeState).subscribe();

    if (e.index == this.lastStepIndex) {
      this.nexButtonLabel = 'topUp.payNow';

      if (e.completed) {
        this.isLoading = true;
        const rechargePayload: RechargePayload = {
          amount: rechargeState.rechargeAmount!,
          paymentId: rechargeState.paymentMethod!.id,
          socialPlatformId: rechargeState.socialAccount!.id,
          countryCode: rechargeState.countryCode,
          mobileNumber: rechargeState.mobile,
          usePromotionalBalance: rechargeState.usePromotionalBalance,
          countryId:this.user.country_id!+""
        };
        this.__paymentApi
          .recharge(rechargePayload)
          .pipe(
            take(1),
            finalize(() => {
              this.isLoading = false;
            })
          )
          .subscribe(({ data }) => {
            if (
              rechargeState.paymentMethod!.id === 2 ||
              rechargeState.paymentMethod!.id === 4
            ) {
              this.router.navigate(
                ['/dashboard/home/topup-account/payment-receipt'],
                {
                  state: { invoiceId: data.invoiceId },
                }
              );
              return;
            }
            // Open a payment window
            window.location.replace(data.iFrame);
          });
      }
    } else {
      this.nexButtonLabel = 'topUp.next';
    }
  }

  updateChangeAmountState(val: boolean) {
    this.isChangeAmountValid = val;
  }

  ngOnDestroy(): void {
    this.__store.dispatch(RechargeActions.resetRechargeState());
  }
}
