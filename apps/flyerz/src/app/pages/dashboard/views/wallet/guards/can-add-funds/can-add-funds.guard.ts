import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { selectConnectionDetails } from '@flyerz/store/app';
import { Store } from '@ngrx/store';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'any' })
export class CanAddFundsGuard {
  constructor(
    private __router: Router,
    private __dialog: DialogService,
    private __store: Store
  ) {}

  canActivate(): Observable<boolean> {
    return this.__store.select(selectConnectionDetails).pipe(
      map((data) => {
        const canAccess =
          data?.isFacebookConnected || !data?.isFacebookTokenExpired;

        if (!canAccess) {
          this.openConfirmPopup();
          this.__router.navigate(['/my-dashboard/wallet']);
        }
        return canAccess;
      })
    );
  }

  openConfirmPopup(): void {
    import(
      '@flyerz/shared/components/confirm-popup/confirm-popup.component'
    ).then((component) => {
      this.__dialog.open(component.ConfirmPopupComponent, {
        styleClass: 'confirm-popup',
        data: {
          btnText: 'dashboard.wallet.connect-account-popup.btn',
          title: 'dashboard.wallet.connect-account-popup.title',
          onConfirm: () => {
            this.__router.navigate(['/my-dashboard/settings/accounts']);
          },
        },
      });
    });
  }
}

export const canAddFunds: CanActivateFn = () =>
  inject(CanAddFundsGuard).canActivate();
