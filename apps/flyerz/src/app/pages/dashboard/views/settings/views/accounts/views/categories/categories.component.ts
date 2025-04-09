import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { categoriesImports } from './imports';
import { AccountsApi, Category } from '@flyerz/shared/api';
import {
  Observable,
  Subject,
  catchError,
  finalize,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  ConnectAccountActions,
  ConnectAccountState,
  selectAllConnectAccount,
} from '@flyerz/store/connect-account';
import { AppActions } from '@flyerz/store/app';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-categories',
  standalone: true,
  imports: categoriesImports,
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  //#region Declerations
  @HostBinding('class') class =
    'flex flex-column gap-4 w-8 dashboard-settings__categories';

  get dir() {
    return document.documentElement.dir;
  }
  private __unsubscriber: Subject<void> = new Subject();
  searchValue: string = '';
  selectedCategory!: Category;
  categories$!: Observable<{ data: Array<Category> }>;
  filteredCategories: Array<Category> = [];
  isLoading: boolean = true;
  isConnectLoading: boolean = false;
  accountData$!: Observable<ConnectAccountState>;
  //#endregion

  constructor(
    private __accountApi: AccountsApi,
    private __router: Router,
    private __store: Store,
    private __activeRoute: ActivatedRoute,
    private __toast: MessageService,
    private __dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.getAccountData();
    this.getCategories();
  }

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
    this.__store.dispatch(ConnectAccountActions.reset());
  }

  //#region Methods
  setSelectedCategory(category: Category): void {
    this.selectedCategory = category;
  }

  submitSelectedCategory(accountData: ConnectAccountState): void {
    this.isConnectLoading = true;
    this.submissionMode(accountData)
      .pipe(
        takeUntil(this.__unsubscriber),
        finalize(() => {
          this.isConnectLoading = false;
        }),
        catchError((error: HttpErrorResponse) => {
          this.__toast.add({
            summary: error.error?.message,
            severity: 'error',
          });
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.__store.dispatch(
          AppActions.setFacebookToken({
            token: accountData?.facebookAccessToken || '',
          })
        );
        const changePage =
          !!this.__activeRoute.snapshot.queryParams['changePage'];
        this.openSuccessPopup(
          changePage
            ? 'dashboard.settings.connect-success-popup.update-title'
            : 'dashboard.settings.connect-success-popup.title'
        );
        this.__router.navigate(['/my-dashboard/settings/accounts']);
      });
  }

  submissionMode(accountData: ConnectAccountState): Observable<any> {
    const changePage = !!this.__activeRoute.snapshot.queryParams['changePage'];
    return changePage
      ? this.__accountApi.updateFacebookPage(
          this.selectedCategory.id,
          accountData.facebookPageId
        )
      : this.__accountApi.connectToSocialMedia(
          accountData.facebookPageId,
          accountData.channelId,
          this.selectedCategory.id,
          accountData.facebookAccessToken
        );
  }

  openSuccessPopup(
    title: string = 'dashboard.settings.connect-success-popup.title'
  ): void {
    import(
      '@flyerz/shared/components/success-popup/success-popup.component'
    ).then((component) => {
      this.__dialog.open(component.SuccessPopupComponent, {
        styleClass: 'success-popup',
        data: {
          title,
          subtitle: 'dashboard.settings.connect-success-popup.subtitle',
          route: '/create-ad',
          btnText: 'dashboard.settings.connect-success-popup.btn',
        },
      });
    });
  }

  filterCategories(categories: Array<Category>): void {
    this.filteredCategories = categories.filter((item) =>
      item.name.includes(this.searchValue)
    );
  }

  getCategories(): void {
    this.categories$ = this.__accountApi.getCategories().pipe(
      tap((data) => {
        this.filteredCategories = [...data.data];
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  getAccountData(): void {
    this.accountData$ = this.__store.select(selectAllConnectAccount).pipe(
      tap((data) => {
        if (!data.facebookPageId) {
          this.__router.navigate(['/my-dashboard/settings/accounts']);
        }
      })
    );
  }
  //#endregion
}
