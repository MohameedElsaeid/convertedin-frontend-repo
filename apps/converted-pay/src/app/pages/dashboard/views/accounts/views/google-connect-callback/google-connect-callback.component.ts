import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccountCardComponent, WarningBannerComponent } from '../../components';
import {
  AuthApi,
  GoogleBusiness,
  SocialAccountsApi,
} from '@converted-pay/shared/api';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  map,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from 'apps/converted-pay/src/environment/environment';
import { SpinnerComponent } from '@converted-pay/shared/components';
import { LogApi } from '@converted-pay/shared/api/log/base/log.base';
import { LogEventsDirective } from '@converted-pay/shared/directives';
import { DialogService } from 'primeng/dynamicdialog';
import { HowToActiveGoogleComponent } from '../../../../components/how-to-active-google/how-to-active-google.component';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import {  selectUserData } from '@converted-pay/store/app';
@Component({
  selector: 'convertedin-google-connect-callback',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    NgFor,
    ProgressSpinnerModule,
    AngularSvgIconModule,
    AccountCardComponent,
    RouterLink,
    SpinnerComponent,
    LogEventsDirective,
    WarningBannerComponent,
    TranslateModule,
  ],
  templateUrl: './google-connect-callback.component.html',
  styleUrls: ['./google-connect-callback.component.scss'],
})
export class GoogleConnectCallbackComponent implements OnInit {
  readonly EGYPT_COUNTRY_ID = 7;
  userBusinessList$!: Observable<GoogleBusiness[]>;
  selectedBusiness: GoogleBusiness | null = null;
  isLoading$ = new BehaviorSubject(false);
  isLoadingUserBusiness$ = new BehaviorSubject(false);
  googleCode!: string;
  refreshToken!: string;
  showBanner = false;
  customCurrency$ = this.store
    .select(selectUserData)
    .pipe(
      map((user) => user?.country_id === this.EGYPT_COUNTRY_ID ?  'EGP' : 'USD'))
  get hostname() {
    return `${location.protocol}//${location.hostname}`;
  }

  constructor(
    private socialAccountsApi: SocialAccountsApi,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authApi: AuthApi,
    private logApi: LogApi,
    private dialog: DialogService,
    private store: Store
  ) {}
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.queryParams;
    this.googleCode = params['code'];
    if (!this.googleCode) {
      this.router.navigate(['/dashboard/accounts/connect']);
    }
    this.getBusinesses();
  }

  getBusinesses() {
    this.isLoadingUserBusiness$.next(true);
    this.userBusinessList$ = this.getRefreshToken().pipe(
      tap((res) => {
        this.refreshToken = res.refresh_token;
      }),
      switchMap((res) =>
        this.socialAccountsApi.getGoogleBusinesses(res.refresh_token).pipe(
          map((res) => {
            this.showBanner = res.data.length > 0;
            return res.data.filter((item) => !item.manager);
          }),
          finalize(() => {
            this.isLoadingUserBusiness$.next(false);
          })
        )
      )
    );
  }
  openHowToActive() {
    this.dialog.open(HowToActiveGoogleComponent, {
      showHeader: false,
    });
  }
  getRefreshToken() {
    const googleTokenConfig = {
      code: this.googleCode,
      client_id: environment.googleClientId,
      client_secret: environment.googleClientSecret,
      redirect_uri: `${this.hostname}/dashboard/accounts/account-callback/1`,
      grant_type: 'authorization_code',
      access_type: 'offline',
    };

    return this.authApi.getGoogleToken(googleTokenConfig).pipe(
      catchError((err) => {
        const errorMessage =
          err?.error?.error ?? 'get token from google is failed';
        this.logApi.errorLog(errorMessage).subscribe();
        this.router.navigate(['/dashboard/accounts/connect']);
        return throwError(() => err);
      })
    );
  }
  connectUserBusiness() {
    if (!this.selectedBusiness) return;
    this.isLoading$.next(true);
    this.socialAccountsApi
      .connectGoogleAccount({
        adAccountId: this.selectedBusiness.id,
        clientCustomer: this.selectedBusiness.clientCustomer,
        currencyCode: this.selectedBusiness.currencyCode,
        level: this.selectedBusiness.level,
        manager: this.selectedBusiness.manager,
        resourceName: this.selectedBusiness.resourceName,
        timeZone: this.selectedBusiness.timeZone,
        refreshToken: this.refreshToken,
        status: 'ENABLED',
      })
      .pipe(
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((res) => {
        this.router.navigate(['/dashboard/accounts']);
      });
  }
}
