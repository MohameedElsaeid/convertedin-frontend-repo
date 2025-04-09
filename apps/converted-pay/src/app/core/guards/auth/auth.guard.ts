import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageConstants } from '@converted-pay/shared/constants';

export function AuthGuard(): boolean {
  const router = inject(Router);
  const token = localStorage.getItem(LocalStorageConstants.TOKEN) 

  if (!token) {
    router.navigate(['/auth']);
  }

  return !!token;
}


