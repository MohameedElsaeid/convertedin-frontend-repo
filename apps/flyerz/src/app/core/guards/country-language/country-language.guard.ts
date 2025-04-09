import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageConstants } from '@flyerz/shared/constants';

export const countryLanguageGuard: CanActivateFn = () => {
  const router = inject(Router);
  const hasConfig =
    localStorage.getItem(LocalStorageConstants.COUNTRY_ID) &&
    localStorage.getItem(LocalStorageConstants.LANGUAGE);

  if (!hasConfig) {
    router.navigate(['/auth/country-language']);
    return false;
  }

  return true;
};
