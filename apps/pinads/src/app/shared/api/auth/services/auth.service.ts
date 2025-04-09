import { QueryApi } from '@convertedin/api';
import { Injectable } from '@angular/core';
import { AuthApi } from '../base/auth';
import { Observable } from 'rxjs';
import {
  ForgotPasswordVerifyPayload,
  GoogleCheckConnectionResponse,
  GoogleTokenPayload,
  GoogleTokenResponse,
  Register,
  ResetPasswordPayload,
  User,
} from '../models';
import { Login } from '../models/interfaces/login.interface';
import { AuthEndpoints } from '../constants/auth.constants';
import { ApiResponse } from '@pinads/shared/models/interfaces/api.interface';
import { Category, GoogleAuthEndpoints } from '../constants';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService extends AuthApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override login(data: Login): Observable<ApiResponse<User>> {
    return this.__queryApi.post(AuthEndpoints.LOGIN, data);
  }
  override register(data: Register): Observable<ApiResponse<User>> {
    return this.__queryApi.post(AuthEndpoints.REGISTER, data);
  }
  override logout(): Observable<ApiResponse<object>> {
    return this.__queryApi.post(AuthEndpoints.LOGOUT, {});
  }
  override verifyOTP(code: string): Observable<ApiResponse<object>> {
    return this.__queryApi.post(AuthEndpoints.OTP, { code });
  }
  override resendOTP(): Observable<ApiResponse<object>> {
    return this.__queryApi.get(AuthEndpoints.RESEND_OTP);
  }
  override getGoogleToken(
    data: GoogleTokenPayload
  ): Observable<GoogleTokenResponse> {
    return this.__queryApi.post(GoogleAuthEndpoints.GOOGLE_AUTH_TOKEN, data);
  }

  override refreshToken(google_token: string): Observable<ApiResponse<object>> {
    return this.__queryApi.post(GoogleAuthEndpoints.REFRESH_TOKEN, {
      google_token,
    });
  }

  override checkGoogleToken(): Observable<
    ApiResponse<GoogleCheckConnectionResponse>
  > {
    return this.__queryApi.get(GoogleAuthEndpoints.CHECK_GOOGLE_CONNECTION);
  }

  override googleConnect(): Observable<
    ApiResponse<{ google_connect_url: string }>
  > {
    return this.__queryApi.get(GoogleAuthEndpoints.GOOGLE_Connect);
  }

  override forgotPassword(email: string): Observable<ApiResponse<object>> {
    return this.__queryApi.post(AuthEndpoints.FORGOT_PASSWORD, { email });
  }
  override forgotPasswordVerify(
    data: ForgotPasswordVerifyPayload
  ): Observable<ApiResponse<{ token: string }>> {
    return this.__queryApi.post(AuthEndpoints.FORGOT_PASSWORD_VERIFY, data);
  }
  override resetPassword(
    token: string,
    data: ResetPasswordPayload
  ): Observable<ApiResponse<object>> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    return this.__queryApi.post(AuthEndpoints.RESET_PASSWORD, data, {
      headers,
    });
  }
  override getCategories(): Observable<ApiResponse<Category[]>> {
    return this.__queryApi.get(AuthEndpoints.GET_CATEGORIES);
  }

  override impersonateLogin(
    impersonate_token: string
  ): Observable<ApiResponse<User>> {
    return this.__queryApi.post(AuthEndpoints.IMPERSONATE_LOGIN, {
      impersonate_token,
    });
  }

  override getUser(): Observable<ApiResponse<User>> {
    return this.__queryApi.get(AuthEndpoints.GET_USER_PROFILE);
  }
}
