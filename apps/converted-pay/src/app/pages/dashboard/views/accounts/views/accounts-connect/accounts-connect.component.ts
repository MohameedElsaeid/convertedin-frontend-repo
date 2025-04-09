import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { WarningBannerComponent } from '../../components';
import { environment } from 'apps/converted-pay/src/environment/environment';
import { HttpParams } from '@angular/common/http';
import { SocialAccount, SocialAccountsApi } from '@converted-pay/shared/api';
import {
  BehaviorSubject,
  finalize,
} from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import {
  AccountCardComponent,
  SpinnerComponent,
} from '@converted-pay/shared/components';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-accounts-connect',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    WarningBannerComponent,
    RouterLink,
    SpinnerComponent,
    AccountCardComponent,
    TranslateModule
  ],
  templateUrl: './accounts-connect.component.html',
  styleUrls: ['./accounts-connect.component.scss'],
  host: {
    class: 'block bg-white border-round-lg mt-3',
  },
})
export class AccountsConnectComponent implements OnInit {
  accountList!: SocialAccount[];
  selectedAccount!: SocialAccount;
  isLoading$ = new BehaviorSubject(false);
  get hostname() {
    return `${location.protocol}//${location.hostname}`;
  }

  constructor(
    private socialAccountsApi: SocialAccountsApi,
    private router: Router,
    private destroyRef: DestroyRef
  ) {}
  ngOnInit(): void {
    this.getSocialAccountList();
  }
  onSelectType(account: SocialAccount) {
    this.selectedAccount = account;
  }
  getSocialAccountList() {
    this.isLoading$.next(true);
    this.socialAccountsApi
      .getSocialAccounts()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((res) => {
        this.accountList = res.data;
      });
  }
  connectAccount() {
    switch (this.selectedAccount.id) {
      case 1:
        this.connectGoogle();
        break;
      case 2:
        this.router.navigate(['/dashboard/accounts/meta-account']);
    }
  }
  connectGoogle() {
    const params = {
      client_id: environment.googleClientId,
      redirect_uri: `${this.hostname}/dashboard/accounts/account-callback/1`,
      response_type: 'code',
      scope: ['https://www.googleapis.com/auth/adwords'].join(' '),
      state: 'pass-through value',
      prompt: 'consent',
      access_type: 'offline',
    };
    const url =
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      new HttpParams({ fromObject: params }).toString();

    if (this.isWebView()) {
      if (this.isIOS()) {
        const link = document.createElement('a');
        link.href = 'x-safari-' + url;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }
      window.location = `intent:${url}#Intent;end` as any;
      return;
    }
    window.location.replace(url);
  }
  isWebView(): boolean {
    const userAgent =
      navigator.userAgent || navigator.vendor || (window as any['opera']);

    // Detect if it's a WebView based on userAgent
    const isAndroidWebView = /wv|version\/[\d.]+.*chrome\/[.0-9]* mobile/.test(
      userAgent.toLowerCase()
    );
    const isIOSWebView = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Version)/i.test(
      userAgent
    );

    return isAndroidWebView || isIOSWebView;
  }

  isIOS(): boolean {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
}
