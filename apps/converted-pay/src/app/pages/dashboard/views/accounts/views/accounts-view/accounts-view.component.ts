import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RefundPolicyComponent,
  WarningBannerComponent,
} from '../../components';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  AppActions,
  selectCurrency,
  selectUserData,
} from '@converted-pay/store/app';
import {
  ConnectedAccount,
  SocialAccount,
  SocialAccountsApi,
} from '@converted-pay/shared/api';
import {
  BehaviorSubject,
  Observable,
  finalize,
  map,
  of,
  switchMap,
} from 'rxjs';
import { SpinnerComponent } from '@converted-pay/shared/components';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-accounts-view',
  standalone: true,
  imports: [
    CommonModule,
    WarningBannerComponent,
    AngularSvgIconModule,
    RouterLink,
    SpinnerComponent,
    TranslateModule,
  ],
  templateUrl: './accounts-view.component.html',
  styleUrls: ['./accounts-view.component.scss'],
})
export class AccountsViewComponent implements OnInit {
  connectedAccounts$!: Observable<SocialAccount[]>;
  isLoading$ = new BehaviorSubject(false);
  userData$ = this.store.select(selectUserData);
  showWarningBanner = false;
  currency$ = this.store.select(selectCurrency);
  infoBannerList: string[] = [
    'account.infoBannerList.0',
    'account.infoBannerList.1',
    'account.infoBannerList.2',
    'account.infoBannerList.3',
  ];
  readonly EGYPT_COUNTRY_ID = 7;

  customCurrency$ = this.store
    .select(selectUserData)
    .pipe(
      map((user) =>
        user?.country_id === this.EGYPT_COUNTRY_ID ? 'EGP' : 'USD'
      )
    );

  constructor(
    private socialAccountsApi: SocialAccountsApi,
    private store: Store,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.getConnectedAccounts();
  }
  getConnectedAccounts() {
    this.isLoading$.next(true);
    this.connectedAccounts$ = this.socialAccountsApi.getSocialAccounts().pipe(
      switchMap((socialAccounts) =>
        this.socialAccountsApi.getUserConnectedAccounts().pipe(
          map((res) => {
            this.store.dispatch(
              AppActions.setConnectedAccount({ connectedAccounts: res.data })
            );
            console.log(socialAccounts);

            this.showWarningBanner = res.data.length === 0;
            return socialAccounts.data.map((socialAccount) => {
              const connectedAccounts = res.data.filter(
                (user) => user.platformId === socialAccount.id
              );
              return { ...socialAccount, connectedAccounts };
            });
          }),
          finalize(() => {
            this.isLoading$.next(false);
          })
        )
      )
    );
  }
  disconnectAccount(account: ConnectedAccount) {
    this.isLoading$.next(true);
    this.socialAccountsApi
      .disconnectAccount(account.id)
      .pipe(
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((res) => {
        this.getConnectedAccounts();
      });
  }
  addToWaitList(id: number) {
    this.socialAccountsApi.addToPlatformWaitList(id).subscribe((res) => {
      this.getConnectedAccounts();
    });
  }
  openRefundPolicy() {
    this.dialog.open(RefundPolicyComponent, { showHeader: false });
  }
}
