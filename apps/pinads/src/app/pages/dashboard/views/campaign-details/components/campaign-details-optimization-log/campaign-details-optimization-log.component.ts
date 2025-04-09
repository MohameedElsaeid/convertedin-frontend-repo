import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import {
  BehaviorSubject,
  Observable,
  Subject,
  finalize,
  map,
  startWith,
} from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import {
  CampaignApi,
  OptimizationLog,
  OptimizationLogResponse,
} from '@pinads/shared/api/campaign';
import { ActivatedRoute } from '@angular/router';
import { MetaPayload } from '@pinads/shared/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'convertedin-campaign-details-optimization-log',
  standalone: true,
  imports: [CommonModule, TableModule, PaginatorModule, TranslateModule],
  templateUrl: './campaign-details-optimization-log.component.html',
  styleUrls: ['./campaign-details-optimization-log.component.scss'],
})
export class CampaignDetailsOptimizationLogComponent implements OnInit {
  @Input() id!: string;
  @Input() update$ = new Subject();
  pageLinkSize: number;
  loading$ = new BehaviorSubject(false);
  optimizationList$!: Observable<OptimizationLogResponse>;
  metaPayload: MetaPayload = {
    page: 1,
    per_page: 10,
  };
  constructor(
    private campaignApi: CampaignApi,
    private destroyRef: DestroyRef
  ) {
    this.pageLinkSize = window.innerWidth <= 768 ? 2 : 3;
  }
  ngOnInit(): void {
    this.getOptimizationList();
    this.update$
      .asObservable()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.metaPayload.page = 1;
        this.getOptimizationList();
      });
  }

  getOptimizationList() {
    this.loading$.next(true);
    this.optimizationList$ = this.campaignApi
      .getOptimizationLogs(this.id, this.metaPayload)
      .pipe(
        map((res) => res.data),
        finalize(() => {
          this.loading$.next(false);
        }),
        startWith({ logs: [], pages_number: 0, current_page: 0 })
      );
  }
  onPageChange(e: any) {
    this.metaPayload.page = e.page + 1;
    this.getOptimizationList();
  }
}
