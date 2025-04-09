import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageConstants } from '@super-admin/shared/constants';

export function GuestGuard(): boolean {
  const router = inject(Router);
  const token = localStorage.getItem(LocalStorageConstants.TOKEN) 

  if (token) {
    router.navigate(['/dashboard/home']);
  }

  return !token;
}


