import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { AdGoal, CreateAdApi, provideCreateAdApi } from '@flyerz/shared/api';
import { Observable, finalize, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { CreateAdActions, selectAdGoal } from '@flyerz/store/create-ad';
import { TranslateModule } from '@ngx-translate/core';
import { SpinnerComponent } from '@flyerz/shared/components';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'convertedin-ad-goal-popup',
  standalone: true,
  imports: [
    CommonModule,
    RadioButtonModule,
    ButtonModule,
    TranslateModule,
    SpinnerComponent,
    FormsModule,
  ],
  templateUrl: './ad-goal-popup.component.html',
  styleUrls: ['./ad-goal-popup.component.scss'],
  providers: [provideCreateAdApi()],
})
export class AdGoalPopupComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column gap-4';
  goals$!: Observable<{ data: AdGoal[] }>;
  currentGoal$!: Observable<AdGoal | undefined>;
  isLoading: boolean = true;
  activeGoal!: number;
  //#endregion

  constructor(
    private __store: Store,
    private __createAdApi: CreateAdApi,
    private __dialog: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.getGoals();
    this.getCurrentGoal();
  }

  //#region Methods
  getCurrentGoal(): void {
    this.currentGoal$ = this.__store.select(selectAdGoal).pipe(
      tap((data) => {
        this.activeGoal = data!.id;
      })
    );
  }

  getGoals(): void {
    this.goals$ = this.__createAdApi.getGoals().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  closeDialog(): void {
    this.__dialog.close();
  }

  updateGoal(goal: AdGoal): void {
    this.activeGoal = goal.id;
    this.__store.dispatch(CreateAdActions.setGoal({ goal }));
  }
  //#endregion
}
