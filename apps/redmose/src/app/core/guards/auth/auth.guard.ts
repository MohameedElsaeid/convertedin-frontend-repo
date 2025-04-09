import { Injectable, inject } from '@angular/core';
import { TokenConstants } from '../../../shared/constants';
import { CanActivateFn } from '@angular/router';
import { environment } from 'apps/redmose/src/environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  canActivate(): boolean {
    const token = localStorage.getItem(TokenConstants.TOKEN_KEY);
    // if (!token) {
    //   window.location.href = environment.remoteUrl;
    // }

    // return !!token;
    return true;
  }
}

export const authGuard: CanActivateFn = () => inject(AuthGuard).canActivate();
