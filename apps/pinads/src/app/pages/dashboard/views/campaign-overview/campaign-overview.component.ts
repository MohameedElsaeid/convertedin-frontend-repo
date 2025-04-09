import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';
import { CampaignApi } from '@pinads/shared/api/campaign';
import {
  BehaviorSubject,
  Observable,
  filter,
  finalize,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import { DateFilterComponent } from '../../components';
import { AdCampaignMetrics, BrandApi } from '@pinads/shared/api/brand';
import { NumberFormatterPipe } from '@pinads/shared/pipes/number-format.pipe';
import { MetaPayload } from '@pinads/shared/models';
@Component({
  selector: 'convertedin-campaign-overview',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    DropdownModule,
    FormsModule,
    PaginatorModule,
    RouterLink,
    AngularSvgIconModule,
    TranslateModule,
    AsyncPipe,
    DateFilterComponent,
    NumberFormatterPipe
  ],
  templateUrl: './campaign-overview.component.html',
  styleUrls: ['./campaign-overview.component.scss'],
  host: {
    class: 'block p-3 md:p-4',
  },
  providers: [DatePipe],
})
export class CampaignOverviewComponent implements OnInit {
  pageLinkSize: number;
  overviewList: Array<{
    label: string;
    icon: string;
    key: keyof AdCampaignMetrics;
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

  allCampaigns$!: Observable<any>;
  metaPayload: MetaPayload = {
    page: 1,
    per_page: 10,
  };
  loading$ = new BehaviorSubject(false);
  campaignMetrics!: AdCampaignMetrics;
  get hostname() {
    return `${location.protocol}//${location.hostname}`;
  }
  constructor(
    private campaignApi: CampaignApi,
    private datePipe: DatePipe,
    private activeRoute: ActivatedRoute,
    private brandApi: BrandApi,
    private cdr: ChangeDetectorRef
  ) {
    this.pageLinkSize = window.innerWidth <= 768 ? 2 : 3;
  }
  ngOnInit(): void {
    this.getCampaignMetrics();
    // this.campaignMetrics = this.activeRoute.snapshot.data['metrics'];
    this.getAllCampaigns()
  }
  getAllCampaigns() {
    this.loading$.next(true);
    this.allCampaigns$ = this.campaignApi
      .getAllCampaigns(this.metaPayload)
      .pipe(
        map((res) => res.data),
        finalize(() => {
          this.loading$.next(false);
        }),
        startWith({ campaigns: [], pages_number: 0 })
      );
  }
  getCampaignMetrics() {
    this.brandApi
      .getActiveBrand()
      .pipe(
        filter((res) => !!res.data),
        switchMap((res) => this.brandApi.getBrandMetrics(res.data.id)),
        map((res) => res.data)
      )
      .subscribe((res) => {
        this.campaignMetrics = res;
        this.cdr.markForCheck();
      });
  }
  onChangeFilter(value: Array<Date>) {
    if (value.length > 1) {
      const [from, to] = value;
      this.metaPayload = {
        ...this.metaPayload,
        from_date: this.datePipe.transform(from, 'yyyy-MM-dd')!,
        to_date: this.datePipe.transform(to, 'yyyy-MM-dd')!,
      };
    } else {
      delete this.metaPayload.from_date;
      delete this.metaPayload.to_date;
    }
    this.getAllCampaigns();
  }

  generatePaymentLink(id: string) {
    this.campaignApi
      .generatePaymentLink(id, {
        payment_failure_redirect_url: `${this.hostname}/dashboard/campaign/failed`,
        payment_success_redirect_url: `${this.hostname}/dashboard/campaign/publish`,
      })
      .subscribe((res) => {
        window.location.replace(res.data.payment_link);
      });
  }
  onPageChange(e: any) {
    this.metaPayload.page = e.page + 1;
    this.getAllCampaigns();
  }
}
