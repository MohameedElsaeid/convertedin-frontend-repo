import { Injectable } from '@angular/core';
import { BillingApi } from '../base/billing.base';
import { QueryApi } from '@convertedin/api';
import { Observable } from 'rxjs';
import { BillingEndpoints } from '../constant/billing.constants';
import {
  ActivePlanInterface,
  BillingPlan,
  InvoiceInterface,
  QuotaInterface,
} from '../models/interfaces';
import { CurrentQuotaInterface } from '../models/interfaces/current-quotas.interface';

@Injectable()
export class BillingApiService extends BillingApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override getAllPlans(): Observable<{ plans: BillingPlan[] }> {
    return this.__queryApi.get(BillingEndpoints.GET_ALL_PLANS);
  }

  override getActivePlan(): Observable<{ plan: ActivePlanInterface }> {
    return this.__queryApi.get(BillingEndpoints.GET_ACTIVE_PLAN);
  }

  override getAllInvoices(): Observable<{ data: InvoiceInterface[] }> {
    return this.__queryApi.get(BillingEndpoints.GET_ALL_INVOICES);
  }

  override getAllQuotas(
    type: 'sms' | 'email'
  ): Observable<{ data: QuotaInterface[] }> {
    return this.__queryApi.get(BillingEndpoints.GET_ALL_QUOTAS, {
      params: { type },
    });
  }

  override changePlan(plan_id: number): Observable<{ url: string }> {
    return this.__queryApi.post(BillingEndpoints.CHANGE_PLAN, {
      plan_id,
    });
  }

  override buyQuotas(quotas: number[]): Observable<{ url: string }> {
    return this.__queryApi.post(BillingEndpoints.BUY_QUOTAS, {
      quotas,
    });
  }

  override getAllCurrentQuotas(): Observable<{
    data: CurrentQuotaInterface[];
  }> {
    return this.__queryApi.get(BillingEndpoints.GET_ACTIVE_QUOTAS);
  }
}
