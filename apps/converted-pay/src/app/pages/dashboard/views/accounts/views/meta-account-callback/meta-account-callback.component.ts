import { Component, OnInit } from '@angular/core';
import { AsyncPipe,  NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AccountCardComponent } from '../../components';
import {
  UserBusiness,
  SocialAccountsApi,
  MetaBusiness,
} from '@converted-pay/shared/api';
import {
  Observable,
  BehaviorSubject,
  map,
  finalize,
} from 'rxjs';
import { SpinnerComponent } from '@converted-pay/shared/components';
import { LogEventsDirective } from '@converted-pay/shared/directives';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-meta-account-callback',
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
    TranslateModule
  ],
  templateUrl: './meta-account-callback.component.html',
  styleUrls: ['./meta-account-callback.component.scss'],
})
export class MetaAccountCallbackComponent implements OnInit {
  userBusinessList$!: Observable<MetaBusiness[]>;
  accessToken!: string;
  selectedBusiness: MetaBusiness | null = null;
  isLoading$ = new BehaviorSubject(false);
  isLoadingUserBusiness$ = new BehaviorSubject(false);
  constructor(
    private socialAccountsApi: SocialAccountsApi,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.queryParams;
    this.accessToken = params['code'];
    if (!params['code']) {
      this.router.navigate(['/dashboard/accounts/connect']);
    }
    this.accessToken = params['code'];
    this.getBusinesses();
  }

  getBusinesses() {
    this.isLoadingUserBusiness$.next(true);
    this.userBusinessList$ = this.socialAccountsApi
      .getMetaBusinesses(this.accessToken)
      .pipe(
        map((res) => res.data),
        finalize(() => {
          this.isLoadingUserBusiness$.next(false);
        })
      );
  }
  connectUserBusiness() {
    if (!this.selectedBusiness) return;
    this.isLoading$.next(true);
    this.socialAccountsApi
      .connectMetaAccount(this.accessToken)
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
