import { Component, HostBinding, OnInit } from '@angular/core';
import { pagesListImports } from './import';
import { AccountsApi, SocialMediaPage } from '@flyerz/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize, tap } from 'rxjs';
import {
  ConnectAccountActions,
  ConnectAccountState,
  selectAllConnectAccount,
} from '@flyerz/store/connect-account';
import { Store } from '@ngrx/store';

@Component({
  selector: 'convertedin-pages-list',
  standalone: true,
  imports: pagesListImports,
  templateUrl: './pages-list.component.html',
  styleUrls: ['./pages-list.component.scss'],
})
export class PagesListComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class =
    'flex flex-column gap-4 w-8 dashboard-settings__pages flex-grow-1';
  get dir() {
    return document.documentElement.dir;
  }
  searchValue: string = '';
  activePageId: string = '';
  filteredPages: Array<SocialMediaPage> = [];
  connectAccountData$!: Observable<ConnectAccountState>;
  pages$!: Observable<{ data: Array<SocialMediaPage> }>;
  isLoading: boolean = true;
  //#endregion

  constructor(
    private __router: Router,
    private __accountsApi: AccountsApi,
    private __store: Store,
    private __activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getStoreData();
  }

  //#region Methods
  selectPage(pageId: string): void {
    this.activePageId = pageId;
  }

  submitSelectedPage(): void {
    if (this.activePageId) {
      this.__store.dispatch(
        ConnectAccountActions.setPageID({ id: this.activePageId })
      );
      const changePage = this.__activeRoute.snapshot.queryParams['changePage'];
      this.__router.navigate(['/my-dashboard/settings/accounts/categories'], {
        queryParams: changePage
          ? {
              changePage: true,
            }
          : {},
      });
    }
  }

  filterPages(pages: Array<SocialMediaPage>): void {
    this.filteredPages = pages.filter((item) =>
      item.facebook.name.includes(this.searchValue)
    );
  }

  getPages(token?: string): void {
    this.pages$ = this.__accountsApi.getFacebookPages(token).pipe(
      tap((data) => {
        this.filteredPages = [...data.data];
      }),
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  getStoreData(): void {
    this.connectAccountData$ = this.__store
      .select(selectAllConnectAccount)
      .pipe(
        tap((data) => {
          const changePage =
            !!this.__activeRoute.snapshot.queryParams['changePage'];

          if (changePage || data.facebookAccessToken) {
            this.getPages(changePage ? undefined : data.facebookAccessToken);
          } else {
            this.__router.navigate(['/my-dashboard/settings/accounts']);
          }
        })
      );
  }
  //#endregion
}
