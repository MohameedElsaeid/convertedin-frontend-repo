import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  SocialAccount,
  SocialAccountsApi,
  provideSocialAccountsApi,
} from '@converted-pay/shared/api';
import { Observable, catchError, finalize, of } from 'rxjs';
import { ApiResponse } from '@converted-pay/shared/models/interfaces';
import { Store } from '@ngrx/store';
import { RechargeActions } from '@converted-pay/store/recharge';
import {
  AccountCardComponent,
  SpinnerComponent,
} from '@converted-pay/shared/components';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-select-ad-account-step',
  standalone: true,
  imports: [
    NgFor,
    AsyncPipe,
    NgIf,
    SpinnerComponent,
    TranslateModule,
    AccountCardComponent,
  ],
  templateUrl: './select-ad-account-step.component.html',
  styleUrls: ['./select-ad-account-step.component.scss'],
  providers: [provideSocialAccountsApi()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectAdAccountStepComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column flex-grow-1';
  @Input() selectedAccount!: SocialAccount;
  socialAccounts$!: Observable<ApiResponse<SocialAccount[]>>;
  isLoading = true;
  //#endregion

  constructor(
    private __socialAccountsApi: SocialAccountsApi,
    private __store: Store
  ) {}

  ngOnInit(): void {
    this.socialAccounts$ = this.__socialAccountsApi.getSocialAccounts().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  onSelectType(account: SocialAccount): void {
    this.selectedAccount = account;
    this.__store.dispatch(
      RechargeActions.setRechargeSocialAccount({ socialAccount: account })
    );
  }
}
