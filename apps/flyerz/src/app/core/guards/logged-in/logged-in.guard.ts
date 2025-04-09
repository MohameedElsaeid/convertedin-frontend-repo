import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageConstants } from '@flyerz/shared/constants';

export const loggedInGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem(LocalStorageConstants.TOKEN);

  if (token) {
    router.navigate(['/my-dashboard']);
  }

  return !token;
};
