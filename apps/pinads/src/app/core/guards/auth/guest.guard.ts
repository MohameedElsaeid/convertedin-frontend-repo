import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorageConstants } from '@pinads/shared/constants';
import { appFeature } from '@pinads/store/app';
import { Observable, filter, map, tap } from 'rxjs';

export function GuestGuard(): boolean | Observable<boolean> {
  const router = inject(Router);
  const token = localStorage.getItem(LocalStorageConstants.TOKEN);
  const store = inject(Store);

  if (!token) return true;

  return store.select(appFeature.selectUserData).pipe(
    filter((res) => !!res),
    map((res) => {
      return !res?.email_verified;
    }),
    tap((val) => {
      if (!val) router.navigate(['/dashboard']);
    })
  );
}
