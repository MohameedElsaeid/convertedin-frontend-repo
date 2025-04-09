import { Observable } from 'rxjs';
import { BillingPlan } from '../models/interfaces';
import { ActivePlanInterface } from '../models/interfaces';
import { InvoiceInterface } from '../models/interfaces';
import { QuotaInterface } from '../models/interfaces';
import { CurrentQuotaInterface } from '../models/interfaces/current-quotas.interface';

export abstract class BillingApi {
  /**
   * Gets a list of all billing plans
   */
  abstract getAllPlans(): Observable<{ plans: BillingPlan[] }>;

  /**
   * Gets the current user active plan
   */
  abstract getActivePlan(): Observable<{ plan: ActivePlanInterface }>;
  /**
   * Changes the current user plan based on the plan_id
   */
  abstract changePlan(plan_id: number): Observable<{ url: string }>;

  /**
   * Gets a list of all user invoices
   */
  abstract getAllInvoices(): Observable<{ data: InvoiceInterface[] }>;
  // abstract getAllInvoices(currentPage: number, rows: number): Observable<{data:InvoiceInterface[], meta: any}>

  /**
   * Gets a list of all available sms and email quotas
   */
  abstract getAllQuotas(
    type: 'sms' | 'email'
  ): Observable<{ data: QuotaInterface[] }>;

  /**
   * Grabs and array of the email and sms quotas and buys them
   */
  abstract buyQuotas(quotas: number[]): Observable<{ url: string }>;

  /**
   * Gets a list of all Current user quotas
   */
  abstract getAllCurrentQuotas(): Observable<{ data: CurrentQuotaInterface[] }>;
}
