import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BillingApi, CurrentQuotaInterface } from '@redmose/shared/api';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ActivePlanComponent } from '../../components/active-plan/active-plan.component';
import { QuoteComponent } from '../../components/quote/quote.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss'],
  standalone: true,
  imports: [NgIf, AsyncPipe, QuoteComponent, ActivePlanComponent, RouterLink,TranslateModule],
})
export class SubscriptionPlansComponent implements OnInit {
  activeQuota$!: Observable<{ data: CurrentQuotaInterface[] }>;
  isLoading: boolean;
  constructor(private __billingApi: BillingApi) {}

  ngOnInit(): void {
    this.activeQuota$ = this.__billingApi.getAllCurrentQuotas();
  }
}
