import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { selectUserData } from '@converted-pay/store/app';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

export function WaitingListGuards(): Observable<boolean> {
  const router = inject(Router);

  return inject(Store)
    .select(selectUserData)
    .pipe(
      map((userData) => {
        if (userData?.isInWaitingList) {
          router.navigate(['/dashboard/home']);
          return false;
        }
        return true;
      })
    );
}
