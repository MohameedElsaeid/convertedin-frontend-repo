import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageConstants } from '@flyerz/shared/constants';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem(LocalStorageConstants.TOKEN);
  const router = inject(Router);

  if (!token) {
    router.navigate(['/auth']);
  }

  return !!token;
};
