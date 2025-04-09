import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { QuotaInterface, BillingApi, BillingPlan } from '@redmose/shared/api';
import { PlanComponent } from './components/plan/plan.component';
import { QuotasComponent } from './components/quotas/quotas.component';
import { FeaturesTableComponent } from './components/features-table/features-table.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TrackingData } from '@redmose/shared/models/interfaces';
import { TrackingService } from '@redmose/shared/base/tracking.base';

@Component({
  selector: 'convertedin-change-plan',
  templateUrl: './change-plan.component.html',
  styleUrls: ['./change-plan.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    PlanComponent,
    QuotasComponent,
    FeaturesTableComponent,
    ButtonModule,
    NgIf,
    RouterLink,
    TranslateModule,
  ],
})
export class ChangePlanComponent {
  constructor(
    private __billingApi: BillingApi,
    private __tracking: TrackingService
  ) {
    // this.isLoading = true;
  }

  addedQuotas: QuotaInterface[] = [];
  quotas: number[] = [];

  onAddingSMSQuota(eventData: QuotaInterface) {
    this.addedQuotas.push(eventData);
    this.__tracking.trackEvent(
      this.getTracking(eventData, 'qouta SMS add to cart')
    );
  }

  onAddingEmailQuota(eventData: QuotaInterface) {
    this.addedQuotas.push(eventData);
    this.__tracking.trackEvent(
      this.getTracking(eventData, 'qouta email add to cart')
    );
  }

  getTracking(quota: QuotaInterface, name: string): TrackingData {
    return {
      eventName: name,
      properties: {
        'selected qouta': quota.name,
        'qouta price': quota.price,
      },
    };
  }

  deleteQuota(index: number): void {
    const removed = this.addedQuotas.splice(index, 1);
    const feature = removed[0].feature;
        
    this.__tracking.trackEvent({
      eventName: 'qouta - delete clicked',
      properties: {
        'deleted qouta name': removed[0].name,
        'deleted quota type': feature,
      },
    });
  }

  sendQuotas(): void {
    this.__tracking.trackEvent({
      eventName: 'qoute- pay now clicked',
      properties: {
        'payment boolean': true,
      },
    });
    this.quotas = this.addedQuotas.map((quota) => quota.id);

    this.__billingApi.buyQuotas(this.quotas).subscribe((data) => {
      window.location.href = data.url;
    });
  }
}
