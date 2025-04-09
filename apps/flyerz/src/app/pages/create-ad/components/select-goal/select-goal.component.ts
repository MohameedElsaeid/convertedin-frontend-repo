import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import {
  AdGoal,
  AdGoals,
  CreateAdApi,
  CreateAdChannelType,
  UserData,
} from '@flyerz/shared/api';
import { selectUserData } from '@flyerz/store/app';
import { CreateAdActions } from '@flyerz/store/create-ad';
import { Store } from '@ngrx/store';
import { Observable, finalize, map } from 'rxjs';
import {
  CreateAdHeaderComponent,
  SpinnerComponent,
} from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-select-goal',
  templateUrl: './select-goal.component.html',
  styleUrls: ['./select-goal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CreateAdHeaderComponent,
    SpinnerComponent,
    TranslateModule,
  ],
})
export class SelectGoalComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class =
    'flex flex-grow-1 flex-column justify-content-center gap-6 align-items-center create-ad__step';
  @Input() goal!: AdGoal;
  @Input() channelType!: CreateAdChannelType;

  isLoading: boolean = true;
  goals$!: Observable<{ data: Array<AdGoal> }>;
  selectedGoal!: AdGoal;
  userData$!: Observable<UserData | undefined>;
  //#endregion

  constructor(private __createAdApi: CreateAdApi, private __store: Store) {}

  ngOnInit(): void {
    this.selectedGoal = this.goal!;

    this.getGoals();
    this.userData$ = this.__store.select(selectUserData);
  }

  //#region Methods
  goalSelection(goal: AdGoal): void {
    this.selectedGoal = goal;
    this.__store.dispatch(CreateAdActions.setGoal({ goal }));
  }

  getGoals(): void {
    this.goals$ = this.__createAdApi.getGoals().pipe(
      map((items) => {
        const newData =
          this.channelType === CreateAdChannelType.INSTAGRAM
            ? items.data.filter((item) => item.id === 2)
            : items.data.filter((item) => item.status);

        return {
          ...items,
          data: [...newData],
        };
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  showGoal(goal: AdGoal, userData: UserData): boolean {
    if (goal.id === AdGoals.LEAD_GENERATION) {
      return userData.isFacebookLeadGenerationAdsEnabled;
    }

    if (goal.id === AdGoals.OUTCOME_SALES) {
      return userData.isFacebookConversionAdsEnabled;
    }

    return true;
  }
  //#endregion
}
