import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { campaignStepperImports } from './imports';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CampaignActions, campaignFeature } from '@pinads/store/campaign';
import { CampaignApi } from '@pinads/shared/api/campaign';
import { BehaviorSubject, finalize, fromEvent, switchMap, take } from 'rxjs';
import { CampaignPayload } from '@pinads/shared/api/campaign/models/interfaces/campaign.interface';
import { TooltipOptions } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { ViewState } from './components';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'convertedin-campaign-stepper',
  templateUrl: './campaign-stepper.component.html',
  styleUrls: ['./campaign-stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: campaignStepperImports,
  host: {
    class: 'block h-full',
  },
})
export class CampaignStepperComponent implements OnInit, OnDestroy {
  readonly TO_MICRO = 1000000;
  isMobileView: boolean;
  defaultCampaignState = {
    brand: false,
    branches: false,
    targeting: false,
    adCampaign: false,
    budget: false,
  };
  campaignState$ = new BehaviorSubject(this.defaultCampaignState);
  nexButtonLabel = 'createCampaign.next';
  isLoading$ = new BehaviorSubject(false);
  lastStepIndex = 6;

  tooltipOptions: TooltipOptions = {
    showDelay: 150,
    tooltipEvent: 'hover',
    tooltipPosition: this.translate.currentLang === 'ar' ? 'right' : 'left',
  };
  indicatorNum = 0;
  intervalState = true;
  tooltipText = this.translate.instant('createCampaign.nextBtnTooltip');
  budgetTooltipText = this.translate.instant('createCampaign.budgetTooltip');
  get hostname() {
    return `${location.protocol}//${location.hostname}`;
  }
  constructor(
    private store: Store,
    private campaignApi: CampaignApi,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private translate: TranslateService,
    private ngZone: NgZone,
    private destroyRef: DestroyRef
  ) {
    this.isMobileView = window.innerWidth <= 868;
  }
  ngOnInit(): void {
    this.subscribeWindowResize();
  }
  subscribeWindowResize() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((event) => {
          const currentValue = window.innerWidth <= 868;
          if (currentValue != this.isMobileView) {
            this.isMobileView = currentValue;
            this.cdr.detectChanges();
          }
        });
    });
  }

  onChangeCampaignState(newState: any) {
    const state = { ...this.campaignState$.value, ...newState };
    this.campaignState$.next(state);
    this.cdr.detectChanges();
  }
  onChangeStep(e: any) {
    if (e.index == this.lastStepIndex) {
      this.nexButtonLabel = 'createCampaign.launch';
    } else {
      this.nexButtonLabel = 'createCampaign.next';
    }
    if (e.index == this.lastStepIndex && e.completed && e.valid) {
      this.isLoading$.next(true);
      this.store
        .select(campaignFeature.selectCampaignState)
        .pipe(
          take(1),
          switchMap((val) => {
            const campaignPayload: CampaignPayload = {
              brand_id: +val.brand!.id,
              lang_code: val.lang_code!,
              keywords: val.keywords!,
              headlines: val.headlines!,
              descriptions: val.description!,
              campaign_name: val.campaign_name!,
              locations: val.locations!.map((item) => item.id),
              proximity: val.proximity!,
              profile_location_id: val.locations[0].id,
              is_custom_budget: val.is_custom_budget!,
              // payment_failure_redirect_url: `${this.hostname}/dashboard/campaign/failed`,
              // payment_success_redirect_url: `${this.hostname}/dashboard/campaign/publish`,
            };
            if (val.is_custom_budget) {
              campaignPayload.custom_budget_micros =
                val.custom_budget! * this.TO_MICRO;
            }else{
              campaignPayload.budget_micros =
                val.budget!.monthly_amount_micros;
            }

            if (val.brandInfo.website_url)
              campaignPayload.website_url = val.brandInfo.website_url;
            if (val.brandInfo.phone_number)
              campaignPayload.phone_number = val.brandInfo.phone_number;
            return this.campaignApi.createCampaign(campaignPayload);
          }),
          finalize(() => this.isLoading$.next(false))
        )
        .subscribe((res) => {
          this.store.dispatch(CampaignActions.resetCampaignState());
          window.location.replace(res.data.payment_link);
          // this.router.navigate(['/dashboard/campaign/publish']);
        });
    }
  }
  updateViewState(viewState: ViewState) {
    this.indicatorNum = viewState.indicatorNum;
    this.intervalState = viewState.intervalState;
  }
  ngOnDestroy(): void {
    this.store.dispatch(CampaignActions.resetCampaignState());
  }
}
