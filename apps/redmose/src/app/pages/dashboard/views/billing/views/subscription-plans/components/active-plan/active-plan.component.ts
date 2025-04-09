import { Component, Input, OnInit } from '@angular/core';
import { PlanEnum } from '../../enumes/plan.enum';
import { BillingApi, ActivePlanInterface } from '@redmose/shared/api';
import { Observable, finalize } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { SpinnerComponent } from '@redmose/shared/components';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-active-plan',
  templateUrl: './active-plan.component.html',
  styleUrls: ['./active-plan.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, SpinnerComponent,TranslateModule],
})
export class ActivePlanComponent implements OnInit {
  @Input() planType: PlanEnum;

  isLoading: boolean;
  plan$!: Observable<{ plan: ActivePlanInterface }>;
  constructor(private __billingApi: BillingApi) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.plan$ = this.__billingApi.getActivePlan().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
}
