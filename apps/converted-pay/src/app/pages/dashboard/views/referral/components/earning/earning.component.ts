import { Component, DestroyRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Earnings } from '@converted-pay/shared/api/user';
import { Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { Store } from '@ngrx/store';
import { selectUserData } from '@converted-pay/store/app';
import { UserData } from '@converted-pay/shared/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencyComponent } from '@converted-pay/shared/components';

@Component({
  selector: 'convertedin-earning',
  standalone: true,
  imports: [CommonModule, TooltipModule,TranslateModule,CurrencyComponent],
  templateUrl: './earning.component.html',
  styleUrls: ['./earning.component.scss'],
})
export class EarningComponent implements OnInit {
  @Input() earning!: Earnings;
  @Input() userCount!: number;
  userData!: UserData | undefined;
  hasConnectedAccount = false;

  get isCashOutDisabled() {
    return (
      this.earning.currentPromotionalWalletBalance === 0 ||
      this.userData?.connectedAccounts?.length === 0 ||
      this.userData?.isInWaitingList
    );
  }
  constructor(
    private router: Router,
    private store: Store,
    private destroyRef: DestroyRef
  ) {}
  ngOnInit(): void {
    this.store
      .select(selectUserData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        this.userData = user;
      });
  }

  redirectToTopup() {
    this.router.navigate(['/dashboard/home/topup-account'], {
      queryParams: { usePromotion: true },
    });
  }
}
