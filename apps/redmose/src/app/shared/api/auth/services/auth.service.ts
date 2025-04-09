import { Injectable } from '@angular/core';
import { AuthApi } from '../base/auth.base';
import { Observable } from 'rxjs';
import { QueryApi } from '@convertedin/api';
import { AuthApiConstants } from '../constants/auth.constant';
import { UserData } from '../models/interfaces';
import { ApiResponse } from '@redmose/shared/models/interfaces';

@Injectable()
export class AuthApiService extends AuthApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override logout(): Observable<void> {
    return this.__queryApi.get(AuthApiConstants.LOGOUT);
  }

  override userData(): Observable<ApiResponse<UserData>> {
    return this.__queryApi.get(AuthApiConstants.GET_NAVBAR);
  }
}
