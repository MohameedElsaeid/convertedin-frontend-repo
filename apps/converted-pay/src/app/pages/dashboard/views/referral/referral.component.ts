import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@converted-pay/shared/components';
import {
  OfferBannerComponent,
  EarningComponent,
  InvitedFriendsComponent,
  ReferralCodeComponent,
  ReferralHowItWorksComponent,
} from './components';
import {
  ReferralResponse,
  provideUserApi,
} from '@converted-pay/shared/api/user';
import { UserApi } from '@converted-pay/shared/api/user/base/user.base';
import { BehaviorSubject, Observable, map, scan, switchMap, tap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-referral',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    OfferBannerComponent,
    EarningComponent,
    InvitedFriendsComponent,
    ReferralCodeComponent,
    ReferralHowItWorksComponent,
    TranslateModule
  ],
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss'],
  providers: [provideUserApi()],
})
export class ReferralComponent implements OnInit {
  referral$!: Observable<ReferralResponse>;
  offset$ = new BehaviorSubject(0);
  hasMoreUsers = true;

  constructor(private userApi: UserApi) {}
  
  ngOnInit(): void {
    this.getReferral();
  }
  getReferral() {
    this.referral$ = this.offset$.pipe(
      switchMap((offset) =>
        this.userApi
          .getReferrals({ limit: 10, offset })
          .pipe(map((res) => res.data))
      ),
      tap((res) => {
        if (res.invitedUsers.count < 10) this.hasMoreUsers = false;
      }),
      scan((prev, curr) => {
        return {
          ...prev,
          invitedUsers: {
            count: curr.invitedUsers.count,
            users: [...prev.invitedUsers.users, ...curr.invitedUsers.users],
          },
        };
      })
    );
  }
  loadInvitedUser() {
    if (this.hasMoreUsers) this.offset$.next(this.offset$.value + 10);
  }
}
