import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CampaignApi,
  CampaignDetails,
  provideCampaignService,
} from '@pinads/shared/api/campaign';
import {
  BehaviorSubject,
  Observable,
  Subject,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { GeoCodePayloadQuery } from '../campaign/view/campaign-stepper/components/targeting/components';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NumberFormatterPipe } from '@pinads/shared/pipes/number-format.pipe';
import { TableModule } from 'primeng/table';
import {
  CampaignDetailsOptimizationLogComponent,
  CampaignDetailsOverviewComponent,
  EditCampaignDialogComponent,
} from './components';
import { DialogService } from 'primeng/dynamicdialog';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'convertedin-campaign-details',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ProgressSpinnerModule,
    AngularSvgIconModule,
    NumberFormatterPipe,
    TableModule,
    CampaignDetailsOverviewComponent,
    RouterLink,
    CampaignDetailsOptimizationLogComponent,
  ],
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.scss'],
  providers: [provideCampaignService(), DialogService],
  host: {
    class: '',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignDetailsComponent implements OnInit {
  readonly MICRO = 1_000_000;
  readonly tabs = { OVERVIEW: 'overview', OPTIMIZATION: 'optimization' };
  campaignDetails$!: Observable<CampaignDetails>;
  address!: string;
  isShowBanner = false;
  isLoading$ = new BehaviorSubject(false);
  overviewList: Array<{
    label: string;
    icon: string;
    key: any;
  }> = [
    {
      label: 'campaignOverview.clicks',
      icon: 'clicks',
      key: 'clicks',
    },
    {
      label: 'campaignOverview.impressions',
      icon: 'impression',
      key: 'impressions',
    },
    {
      label: 'campaignOverview.localActions',
      icon: 'location',
      key: 'local_actions',
    },
    {
      label: 'campaignOverview.callClicks',
      icon: 'call',
      key: 'call_clicks',
    },
  ];
  contentData: Array<{ key: string; value: string }> = [];
  activeTab = this.tabs.OVERVIEW;
  id!: string;
  isLoadingPayment$ = new BehaviorSubject(false);
  updateCampaignLogs$ = new Subject();

  get hostname() {
    return `${location.protocol}//${location.hostname}`;
  }

  constructor(
    private campaignApi: CampaignApi,
    private activeRoute: ActivatedRoute,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private dialog: DialogService,
    private router: Router,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.getCampaignDetails();
    this.subscribeQueryParamsChanges();
  }
  openEditCampaign(campaignDetails: CampaignDetails) {
    const dialogRef = this.dialog.open(EditCampaignDialogComponent, {
      showHeader: false,
      data: { campaignDetails },
    });
    dialogRef.onClose.subscribe((ref) => {
      if (ref) {
        this.updateCampaignLogs$.next(true);
      }
    });
  }
  getCampaignDetails() {
    this.campaignDetails$ = this.activeRoute.params.pipe(
      switchMap((params) => {
        this.isLoading$.next(true);
        this.id = params['id'];
        return this.campaignApi.getCampaignDetails(this.id).pipe(
          map((res) => {
            if (res.data.proximity) {
              const location = {
                lat: res.data.proximity.latitude_in_micro_degrees / this.MICRO,
                lng: res.data.proximity.longitude_in_micro_degrees / this.MICRO,
              };
              this.getAddressDetails({ location });
            }
            const keywords = res.data.keywords.map((keyword) => ({
              key: 'keyword',
              value: keyword,
            }));
            const headlines = res.data.headlines.map((headline) => ({
              key: 'headline',
              value: headline,
            }));
            const descriptions = res.data.descriptions.map((description) => ({
              key: 'description',
              value: description,
            }));
            this.contentData = [...headlines, ...descriptions, ...keywords];
            return res.data;
          }),
          tap((res) => {
            this.isShowBanner = res.status === 'LEARNING';
            this.cdr.markForCheck();
          }),
          finalize(() => {
            this.isLoading$.next(false);
          })
        );
      })
    );
  }

  generatePaymentLink(id: number) {
    this.isLoadingPayment$.next(true);
    this.campaignApi
      .generatePaymentLink(id.toString(), {
        payment_failure_redirect_url: `${this.hostname}/dashboard/campaign/failed`,
        payment_success_redirect_url: `${this.hostname}/dashboard/campaign/publish`,
      })
      .pipe(
        finalize(() => {
          this.isLoadingPayment$.next(false);
        })
      )
      .subscribe((res) => {
        window.location.replace(res.data.payment_link);
      });
  }

  subscribeQueryParamsChanges() {
    this.activeRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((queryParams) => {
        this.activeTab = queryParams['active'] || this.tabs.OVERVIEW;
      });
  }

  changeActiveTab(activeTab: string) {
    this.router.navigate([], {
      queryParams: { active: activeTab },
      queryParamsHandling: 'merge',
    });
  }

  getAddressDetails(queryObj: GeoCodePayloadQuery) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { ...queryObj, language: this.translate.currentLang },
      (results, status) => {
        if (status === 'OK' && results) {
          if (results[0]) {
            const address = results[0];
            this.address = address.formatted_address;

            this.cdr.markForCheck();
          }
        }
      }
    );
  }
}
