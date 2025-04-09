import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { LocalStorageConstants } from '@converted-pay/shared/constants';

export function GuestGuard(route: ActivatedRouteSnapshot): boolean {
  const router = inject(Router);
  const token = localStorage.getItem(LocalStorageConstants.TOKEN);

  if (token) {
    router.navigate(['/dashboard/home'], { queryParams: route.queryParams });
  }

  return !token;
}
