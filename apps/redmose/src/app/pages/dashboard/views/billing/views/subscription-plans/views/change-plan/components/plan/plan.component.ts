import { Component, OnInit } from '@angular/core';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { BillingApi, BillingPlan } from '@redmose/shared/api';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { SpinnerComponent } from '@redmose/shared/components';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TrackingDirective } from '@redmose/shared/directives';
import { TrackingData } from '@redmose/shared/models/interfaces';

@Component({
  selector: 'convertedin-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
  standalone: true,
  imports: [
    SpinnerComponent,
    NgIf,
    NgClass,
    NgFor,
    AsyncPipe,
    TrackingDirective,
    TranslateModule,
  ],
})
export class PlanComponent implements OnInit {
  isLoading: boolean;
  plans$!: Observable<{ plans: BillingPlan[] }>;
  constructor(
    private __billingApi: BillingApi,
    private __toast: MessageService
  ) {
    this.isLoading = true;
  }

  getPlans(): void {
    this.isLoading = true;
    this.plans$ = this.__billingApi.getAllPlans().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  ngOnInit(): void {
    this.getPlans();
  }

  upgradePlan(plan: BillingPlan): void {
    this.__billingApi
      .changePlan(plan.id)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.__toast.add({
            summary: error.error.message,
            severity: 'error',
            key: 'cin-toast',
          });
          return throwError(() => error);
        })
      )
      .subscribe((data) => {
        plan.id === 1 ? this.getPlans() : (window.location.href = data.url);
      });
  }

  getTracking(plan: BillingPlan): TrackingData {
    return {
      eventName: 'select plan clicked',
      properties: {
        'selected plan name': plan.name,
        'selected plan price': plan.price,
      },
    };
  }

  salesPlan(): void {
    window.location.href = 'https://www.converted.in/request-demo';
  }
}
