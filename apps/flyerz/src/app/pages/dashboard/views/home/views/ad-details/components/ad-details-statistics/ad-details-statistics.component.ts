import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AdDetailsAdInsights, AdGoals } from '@flyerz/shared/api';
import { InsightsCardComponent } from '@flyerz/shared/components';
import { goals } from './goal-keys';
import { AdGoalKey } from '../../models/interfaces';

@Component({
  selector: 'convertedin-ad-details-statistics',
  standalone: true,
  imports: [CommonModule, TranslateModule, InsightsCardComponent],
  templateUrl: './ad-details-statistics.component.html',
  styleUrls: ['./ad-details-statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdDetailsStatisticsComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column gap-4';
  @Input({ required: true }) adData!: AdDetailsAdInsights;
  @Input({ required: true }) goalId!: AdGoals;
  @Input({ required: true }) spend!: number;
  goalKeys!: AdGoalKey;
  //#endregion

  ngOnInit(): void {
    this.goalKeys = goals[this.goalId];
  }

  //#region Methods
  getInsights(): Array<{ label: string; value: any }> {
    const newGoals = this.goalKeys?.insights.map((item) => ({
      label: 'dashboard.ad-details.insights.' + item,
      value: (this.adData as any)[item],
    }));

    this.goalKeys?.costPerActionType?.forEach((item) => {
      newGoals.push({
        label: 'dashboard.ad-details.insights.costPerActionType.' + item,
        value: (this.adData.costPerActionType as any)[item],
      });
    });

    return newGoals || [];
  }

  getCards(): Array<{
    label: string;
    value: any;
    currency?: boolean;
    key: string;
  }> {
    const cards = this.goalKeys.cards.insights.map((item) => ({
      label: 'dashboard.ad-details.insights.cards.' + item,
      value: (this.adData as any)[item],
      key: item,
      currency: false,
    }));

    this.goalKeys?.cards?.costPerActionType?.forEach((item) => {
      cards.push({
        label: 'dashboard.ad-details.insights.costPerActionType.' + item,
        value: (this.adData.costPerActionType as any)[item],
        key: item,
        currency: !!this.goalKeys.cards.currency?.includes(item),
      });
    });

    cards.unshift({
      label: 'dashboard.ad-details.insights.cards.spend',
      value: this.spend,
      key: 'spend',
      currency: true,
    });

    return cards;
  }
  //#endregion
}
