import { Component, HostBinding, OnInit } from '@angular/core';
import {
  Ad,
  AdStatus,
  AdsApi,
  ConnectionDetails,
  Insights,
  UserData,
} from '@flyerz/shared/api';
import { Observable, finalize, tap } from 'rxjs';
import { homeImports } from './imports';
import { Store } from '@ngrx/store';
import { selectConnectionDetails, selectUserData } from '@flyerz/store/app';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { PaginationService } from '@flyerz/shared/services';

@Component({
  selector: 'convertedin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: homeImports,
  providers: [PaginationService],
})
export class HomeComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column flex-grow-1 max-h-full';
  loaders = {
    isLoading: true,
    // isConnectionLoading: true,
    isAdsLoading: true,
  };
  insights$!: Observable<{ data: Insights }>;
  connectionDetails$!: Observable<ConnectionDetails | undefined>;
  userData$!: Observable<UserData | undefined>;
  ads$!: Observable<{ data: Array<Ad> }>;
  //#endregion

  constructor(
    private __adsApi: AdsApi,
    private __store: Store,
    private __router: Router,
    private __dialog: DialogService,
    protected _pagination: PaginationService<Ad>
  ) {}

  ngOnInit(): void {
    this._pagination.init(AdStatus.ALL);
    this.getConnectionDetails();
    this.getInsights();
    this.getAdList();
    this.getUserData();
  }

  //#region Methods
  getInsights(): void {
    this.insights$ = this.__adsApi.getInsights().pipe(
      finalize(() => {
        this.loaders.isLoading = false;
      })
    );
  }

  getUserData(): void {
    this.userData$ = this.__store.select(selectUserData);
  }

  getConnectionDetails(): void {
    this.connectionDetails$ = this.__store.select(selectConnectionDetails);
  }

  sortAds(sortIndex: AdStatus): void {
    this._pagination.resetPagination();
    this._pagination.pagination.sort = sortIndex;
    this.getAdList();
  }

  getAdList(): void {
    if (!this._pagination.pagination.reachedTotalCount) {
      this.loaders.isAdsLoading = true;
      this.ads$ = this.__adsApi
        .getAds(
          this._pagination.pagination.offset,
          this._pagination.pagination.sort,
          this._pagination.pagination.limit
        )
        .pipe(
          tap(({ data }) => {
            this._pagination.processData(data);
          }),
          finalize(() => {
            this.loaders.isAdsLoading = false;
          })
        );
    }
  }

  createAd(walletValue: number): void {
    walletValue
      ? this.__router.navigate(['/create-ad'])
      : this.openConfirmPopup();
  }

  openConfirmPopup(): void {
    import(
      '@flyerz/shared/components/confirm-popup/confirm-popup.component'
    ).then((component) => {
      this.__dialog.open(component.ConfirmPopupComponent, {
        styleClass: 'confirm-popup',
        data: {
          btnText: 'dashboard.home.no-funds-popup.btn',
          title: 'dashboard.home.no-funds-popup.title',
          onConfirm: () => {
            this.__router.navigate(['/my-dashboard/wallet/add-funds']);
          },
        },
      });
    });
  }
  //#endregion
}
