import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { adDetailsImports } from './imports';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable, finalize, tap } from 'rxjs';
import {
  AdDetails,
  AdGoals,
  AdsApi,
  ApprovalStatus,
  LearningStage,
} from '@flyerz/shared/api';
import { MenuItem } from 'primeng/api';
import { AdDetailsBannerMode } from './models/types';

@Component({
  selector: 'convertedin-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.scss'],
  standalone: true,
  imports: adDetailsImports,
})
export class AdDetailsComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class =
    'flex flex-column mt-3 flex-grow-1 dashboard__ad-details';
  adNumber!: number;
  isLoading: boolean = true;
  adDetails$!: Observable<{ data: AdDetails }>;
  renew!: { days: number; budget: number };
  menuItems: MenuItem[] = [];
  bannerMode!: AdDetailsBannerMode;

  get adGoal() {
    return AdGoals;
  }
  //#endregion

  constructor(
    private __activeRoute: ActivatedRoute,
    private __dialog: DialogService,
    private __translate: TranslateService,
    private __adsApi: AdsApi
  ) {}

  ngOnInit(): void {
    this.adNumber = parseInt(this.__activeRoute.snapshot.params['adId']);
    this.getAdDetails();
  }

  //#region Methods
  getAdDetails(): void {
    this.isLoading = true;
    this.adDetails$ = this.__adsApi.getAdDetails(this.adNumber).pipe(
      tap(({ data }) => {
        this.renew = {
          budget: data.ad.budget,
          days: data.ad.days,
        };
        this.setBanner(data);
        this.menuItems = this.getMenuItems(data);
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  setBanner(adDetails: AdDetails): void {
    if (adDetails.ad.rejection?.title) {
      this.bannerMode = 'reject';
    } else if (
      adDetails.ad.facebookStatus === ApprovalStatus.IN_REVIEW ||
      adDetails.ad.adminStatus === ApprovalStatus.IN_REVIEW
    ) {
      this.bannerMode = 'pending';
    } else if (adDetails.ad.is_active) {
      switch (adDetails.ad.learningStage) {
        case LearningStage.LEARNING:
          this.bannerMode = 'learn-success';
          break;

        case LearningStage.FAILED:
          this.bannerMode = 'learn-fail';
          break;
      }
    }
  }

  getMenuItems(adDetails: AdDetails): MenuItem[] {
    return adDetails.ad.is_active
      ? [
          {
            label: this.__translate.instant(
              'dashboard.ad-details.renew-budget'
            ),
            command: () => {
              this.renewBudget();
            },
          },
          {
            label: this.__translate.instant('dashboard.ad-details.end-ad'),
            command: () => {
              this.closeAd();
            },
          },
          {
            label: this.__translate.instant('dashboard.ad-details.show-ad'),
            command: () => {
              window.open(adDetails.ad.url, '_blank');
            },
          },
        ]
      : [];
  }

  copyToClipboard(refrenceNum: string): void {
    navigator.clipboard.writeText(refrenceNum);
  }

  closeAd(): void {
    import('../close-ad-popup/close-ad-popup.component').then((component) => {
      this.__dialog.open(component.CloseAdPopupComponent, {
        dismissableMask: false,
        styleClass: 'close-ad-popup',
        header: this.__translate.instant(
          'dashboard.ad-details.finish-ad-title'
        ),
        data: {
          adId: this.adNumber,
        },
      });
    });
  }

  showRejectDetails(adDetails: AdDetails): void {
    import('../ad-reject-reason-popup/ad-reject-reason-popup.component').then(
      (component) => {
        this.__dialog.open(component.AdRejectReasonPopupComponent, {
          dismissableMask: false,
          data: {
            reject: adDetails.ad.rejection,
          },
          styleClass: 'ad-details__budget-popup',
          header: adDetails.ad.rejection.title,
        });
      }
    );
  }

  renewBudget(): void {
    import(
      '@flyerz/shared/components/period-budget-popup/period-budget-popup.component'
    ).then((component) => {
      this.__dialog.open(component.PeriodBudgetPopupComponent, {
        dismissableMask: false,
        data: {
          renew: { ...this.renew },
          adId: this.adNumber,
          onSuccess: () => {
            this.getAdDetails();
          },
        },
        styleClass: 'ad-details__budget-popup',
        header: this.__translate.instant('dashboard.ad-details.renew-budget'),
      });
    });
  }
  //#endregion
}
