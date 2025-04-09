import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConnectAccountActions } from '@flyerz/store/connect-account';
import { AccountsApi } from '@flyerz/shared/api';
import { Subject, catchError, finalize, takeUntil, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';

declare const FB: any;
declare const fcWidget: any;

@Component({
  selector: 'convertedin-connect-faceboook',
  standalone: true,
  imports: [CommonModule, ButtonModule, HeaderComponent, TranslateModule],
  templateUrl: './connect-faceboook.component.html',
  styleUrls: ['./connect-faceboook.component.scss'],
})
export class ConnectFaceboookComponent implements OnDestroy {
  private __unsubscriber: Subject<void> = new Subject();
  private __fbPermissions: string[] = [
    'public_profile',
    'email',
    'pages_show_list',
    'pages_read_engagement',
    'catalog_management',
    'instagram_basic',
    'business_management',
    'pages_manage_metadata',
    'ads_management',
  ];
  isLoading: boolean = false;

  constructor(
    private __router: Router,
    private __store: Store,
    private __activeRoute: ActivatedRoute,
    private __accounts: AccountsApi,
    private __toast: MessageService,
    private __dialog: DialogService
  ) {}

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  connectFb(): void {
    FB.login(
      (response: any) => {
        if (response?.status === 'connected') {
          this.__store.dispatch(
            ConnectAccountActions.setFacebookToken({
              token: response?.authResponse?.accessToken,
            })
          );

          this.__activeRoute.snapshot.queryParams['refresh']
            ? this.refreshToken(response?.authResponse?.accessToken)
            : this.__router.navigate([
                '/my-dashboard/settings/accounts/page-select',
              ]);
        }
      },
      {
        scope: this.__fbPermissions.join(','),
      }
    );
  }

  openChat(): void {
    fcWidget?.open();
  }

  refreshToken(token: string): void {
    this.isLoading = true;
    this.__accounts
      .refreshFacebookToken(token)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((error: HttpErrorResponse) => {
          this.__toast.add({
            summary: error.error?.message,
            severity: 'error',
          });
          return throwError(() => error);
        }),
        takeUntil(this.__unsubscriber)
      )
      .subscribe(() => {
        this.__router.navigate(['/my-dashboard/settings/accounts']);
      });
  }

  openSuccessPopup(): void {
    import(
      '@flyerz/shared/components/success-popup/success-popup.component'
    ).then((component) => {
      this.__dialog.open(component.SuccessPopupComponent, {
        styleClass: 'success-popup',
        data: {
          title: 'dashboard.settings.connect-success-popup.title',
          subtitle: 'dashboard.settings.connect-success-popup.subtitle',
          route: '/create-ad',
          btnText: 'dashboard.settings.connect-success-popup.btn',
        },
      });
    });
  }
  //#endregion
}
