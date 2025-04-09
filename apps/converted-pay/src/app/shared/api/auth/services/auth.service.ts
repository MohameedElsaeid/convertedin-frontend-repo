import { Injectable } from '@angular/core';
import { AuthApi } from '../base/auth.base';
import { QueryApi } from '@convertedin/api';
import { Observable } from 'rxjs';
import { AuthEnpoints } from '../constants/auth.constants';
import { ApiResponse } from '@converted-pay/shared/models/interfaces';
import {
  CompleteRegisterPayload,
  CountryItem,
  FBCampaignData,
  GoogleTokenPayload,
  GoogleTokenResponse,
  LoginPayload,
  RegisterPayload,
  UpdatePasswordPayload,
  UserData,
  VerifyOtpPayload,
} from '../models';
import { GoogleAuthEndpoints } from '../constants/google-auth.constants';

@Injectable()
export class AuthApiService extends AuthApi {
 
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override login(
    loginPayload: LoginPayload
  ): Observable<ApiResponse<UserData>> {
    return this.__queryApi.post(AuthEnpoints.LOGIN, loginPayload);
  }

  override register(registerPayload: RegisterPayload): Observable<any> {
    return this.__queryApi.post(AuthEnpoints.REGISTER, registerPayload);
  }

  override completeRegister(
    completePayload: CompleteRegisterPayload
  ): Observable<any> {
    return this.__queryApi.post(
      AuthEnpoints.COMPLETE_REGISTER,
      completePayload
    );
  }

  override getUserProfile(): Observable<ApiResponse<UserData>> {
    return this.__queryApi.get(AuthEnpoints.GET_USER_DATA);
  }

  override getGoogleToken(
    data: GoogleTokenPayload
  ): Observable<GoogleTokenResponse> {
    return this.__queryApi.post(GoogleAuthEndpoints.GOOGLE_AUTH_TOKEN, data);
  }

  override sendOtp(email: string): Observable<ApiResponse<object>> {
    return this.__queryApi.post(AuthEnpoints.SEND_OTP, { email });
  }
  override verifyOtp(data: VerifyOtpPayload): Observable<ApiResponse<object>> {
    return this.__queryApi.post(AuthEnpoints.VERIFY_OTP, data);
  }
  override updatePassword(
    data: UpdatePasswordPayload
  ): Observable<ApiResponse<object>> {
    return this.__queryApi.post(AuthEnpoints.UPDATE_PASSWORD, data);
  }
  
  override updateFBCampaignData(data: FBCampaignData): Observable<ApiResponse<object>> {
    return this.__queryApi.post(AuthEnpoints.UPDATE_FBCAMPAIGN_DATA, data);
  }

  override getCountryList(): Observable<ApiResponse<Array<CountryItem>>> {
    return this.__queryApi.get(AuthEnpoints.GET_COUNTRY_LIST);
  }
}
