import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { selectUserData, selectValidations } from '@flyerz/store/app';
import { Store } from '@ngrx/store';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, catchError, forkJoin, map, of, take } from 'rxjs';

@Injectable({ providedIn: 'any' })
export class CanCreateAdGuard {
  constructor(
    private __router: Router,
    private __store: Store,
    private __dialog: DialogService
  ) {}

  canActivate(): Observable<boolean> {
    return forkJoin([
      this.__store.select(selectUserData).pipe(take(1)),
      this.__store.select(selectValidations).pipe(take(1)),
    ]).pipe(
      map(([user, validations]) => {
        if (
          !user?.user.wallet ||
          user?.user.wallet < validations!.createAd.minBudget
        ) {
          this.__router.navigate(['/my-dashboard']);
          this.openConfirmPopup();
          return false;
        }

        return user?.user.wallet >= validations!.createAd.minBudget;
      }),
      catchError((error) => {
        return of(false);
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
          btnText: 'dashboard.home.no-funds-popup.btn',
          title: 'dashboard.home.no-funds-popup.title',
          onConfirm: () => {
            this.__router.navigate(['/my-dashboard/wallet/add-funds']);
          },
        },
      });
    });
  }
}

export const canCreateAd: CanActivateFn = () =>
  inject(CanCreateAdGuard).canActivate();
