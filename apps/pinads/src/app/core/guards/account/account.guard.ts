import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApi } from '@pinads/shared/api/auth';
import { Observable, map, tap } from 'rxjs';

export function AccountGuard(): Observable<boolean> {
  const authApi = inject(AuthApi);
  const router = inject(Router);
  return authApi.checkGoogleToken().pipe(
    map((res) => res.data.connected_before),
    tap((val) => {
      if (!val) router.navigate(['/account/google']);
    })
  );
}
