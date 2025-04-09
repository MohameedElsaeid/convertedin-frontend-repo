import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import {
  AuthApi,
  CreateAdApi,
  UserData,
  provideCreateAdApi,
} from '@flyerz/shared/api';
import { AppActions } from '@flyerz/store/app';
import {
  CreateAdActions,
  CreateAdState,
  selectAllCreateAd,
} from '@flyerz/store/create-ad';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import {
  Observable,
  Subject,
  catchError,
  concatMap,
  finalize,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { createAdImports } from './imports';

declare const fcWidget: any;

@Component({
  selector: 'convertedin-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss'],
  standalone: true,
  imports: createAdImports,
  providers: [provideCreateAdApi()],
})
export class CreateAdComponent implements OnInit, OnDestroy {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column flex-grow-1';

  private __unsubscriber: Subject<void> = new Subject();
  createAdData$!: Observable<CreateAdState>;
  adCreated: boolean = false;
  userData$!: Observable<{ data: UserData }>;
  isLoading: boolean = false;
  //#endregion

  constructor(
    private __store: Store,
    private __createAd: CreateAdApi,
    private __toast: MessageService,
    private __account: AuthApi
  ) {}

  ngOnInit(): void {
    this.__store.dispatch(CreateAdActions.reset());
    this.createAdData$ = this.__store.select(selectAllCreateAd);

    if (document.getElementById('fc_frame')) {
      fcWidget?.hide();
    }
  }

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
    this.__store.dispatch(CreateAdActions.reset());
  }

  //#region Methods
  updateUserData(): void {
    this.userData$ = this.__account.getUserData().pipe(
      tap((data) => {
        this.__store.dispatch(AppActions.setUserData({ user: data.data }));
      })
    );
  }

  indexChange(event: any, adData: CreateAdState): void {
    if (event.index === 4 && event.completed) {
      this.isLoading = true;

      this.__createAd
        .createAd(adData)
        .pipe(
          takeUntil(this.__unsubscriber),
          catchError((error: HttpErrorResponse) => {
            this.__toast.add({
              summary: error.error?.message,
              severity: 'error',
            });
            return throwError(() => error);
          }),
          concatMap(() => {
            this.updateUserData();
            return this.userData$;
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe(() => {
          this.adCreated = true;
          this.__store.dispatch(CreateAdActions.reset());
        });
    }
  }
  //#endregion
}
