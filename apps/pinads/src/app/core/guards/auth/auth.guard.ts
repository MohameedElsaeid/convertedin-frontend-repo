import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorageConstants } from '@pinads/shared/constants';
import { appFeature } from '@pinads/store/app';
import { Observable, filter, map, tap } from 'rxjs';

export function AuthGuard(): boolean | Observable<boolean> {
  const router = inject(Router);
  const store = inject(Store);
  const token = localStorage.getItem(LocalStorageConstants.TOKEN);

  if (!token) {
    router.navigate(['/auth']);
    return false;
  }
  return store.select(appFeature.selectUserData).pipe(
    filter((res) => !!res),
    map((res) => !!res?.email_verified),
    tap((val) => {
      if (!val) router.navigate(['/auth']);
    })
  );
}
