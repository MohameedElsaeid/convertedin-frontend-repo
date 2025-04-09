import { Injectable } from '@angular/core';
import { AuthApi } from '../base/auth.base';
import { ApiResponse } from '@super-admin/shared/models';
import { Observable } from 'rxjs';
import { LoginPayload, LoginResponse } from '../models';
import { QueryApi } from '@convertedin/api';
import { AuthEndpoints } from '../constants/auth.constants';

@Injectable()
export class AuthService implements AuthApi {
  constructor(private __queryApi: QueryApi) {}
  login(loginPayload: LoginPayload): Observable<ApiResponse<LoginResponse>> {
    return this.__queryApi.post(AuthEndpoints.LOGIN, loginPayload);
  }
  logout(): Observable<Object> {
    return this.__queryApi.post(AuthEndpoints.LOGOUT, {});
  }
}
