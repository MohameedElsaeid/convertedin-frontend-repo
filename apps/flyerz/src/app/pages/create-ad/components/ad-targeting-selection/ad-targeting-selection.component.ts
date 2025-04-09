import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import {
  CreateAdApi,
  MatchAdSuggestions,
  Validations,
  createMatchAdSuggestions,
} from '@flyerz/shared/api';
import { CreateAdActions } from '@flyerz/store/create-ad';
import { Store } from '@ngrx/store';
import {
  finalize,
  concatMap,
  catchError,
  throwError,
  retry,
  timer,
  tap,
  Observable,
  Subject,
  takeUntil,
  take,
} from 'rxjs';
import { AiTargetingMode } from '../../models/interfaces';
import { selectValidations } from '@flyerz/store/app';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CreateAdHeaderComponent } from '@flyerz/shared/components';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'convertedin-ad-targeting-selection',
  templateUrl: './ad-targeting-selection.component.html',
  styleUrls: ['./ad-targeting-selection.component.scss'],
  standalone: true,
  imports: [
    LottieComponent,
    CommonModule,
    TranslateModule,
    CreateAdHeaderComponent,
    ButtonModule,
  ],
})
export class AdTargetingSelectionComponent {
  @HostBinding('class') class =
    'flex flex-grow-1 flex-column justify-content-center gap-6 align-items-center create-ad__step';
  @Input({ required: true }) message!: string;
  @Output() completed: EventEmitter<void> = new EventEmitter();

  private __unsubscriber: Subject<void> = new Subject();
  aiData$!: Observable<{ data: MatchAdSuggestions }>;
  isLoading: boolean = false;
  validations!: Validations;
  activeMode!: AiTargetingMode;
  options: Array<AiTargetingMode> = [
    {
      icon: 'assets/icons/create-ad/edit.svg',
      id: 'manual',
      title: 'create-ad.targeting-mode.manual',
    },
    {
      icon: 'assets/icons/create-ad/ai-chip.svg',
      id: 'ai',
      title: 'create-ad.targeting-mode.ai',
    },
  ];
  lottieOptions: AnimationOptions = {
    path: '/assets/lottie/ai_loading.json',
  };

  constructor(private __createAdApi: CreateAdApi, private __store: Store) {}

  setTargetingMode(mode: AiTargetingMode): void {
    this.activeMode = mode;
    this.__store
      .select(selectValidations)
      .pipe(take(1))
      .subscribe((data) => {
        this.__store.dispatch(
          CreateAdActions.addUserCountry({ country: data!.country! })
        );
        this.validations = data!;
        mode.id === 'manual' ? this.manualTargeting(data!) : this.getAiData();
      });
  }

  manualTargeting(data: Validations): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
    this.__store.dispatch(
      CreateAdActions.setAdSugguestions({
        suggestions: createMatchAdSuggestions(
          data.createAd.minDays,
          data.country,
          {
            amount: data.createAd.minBudget,
            currency: data.currency,
          }
        ),
      })
    );
    this.completed.emit();
  }

  getAiData(): void {
    this.aiData$ = this.__createAdApi.createAdByAI(this.message).pipe(
      takeUntil(this.__unsubscriber),
      finalize(() => {
        this.isLoading = false;
      }),
      concatMap(({ data }) => {
        this.isLoading = true;
        this.__store.dispatch(
          CreateAdActions.setAISuggestions({ suggestions: data })
        );
        return this.__createAdApi.matchAdSuggestions(data);
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => Error(error.message));
      }),
      retry({
        count: 3,
        resetOnSuccess: true,
        delay: (error: HttpErrorResponse, count: number) => {
          this.isLoading = true;
          if (count < 3 && error.status !== 200) {
            return timer(0);
          }

          return throwError(() => Error(error.message));
        },
      }),
      tap(({ data }) => {
        this.__store.dispatch(
          CreateAdActions.setAdSugguestions({ suggestions: data })
        );
        this.completed.emit();
      })
    );
  }
}
