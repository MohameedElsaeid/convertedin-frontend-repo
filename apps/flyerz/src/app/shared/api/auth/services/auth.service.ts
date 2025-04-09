import { Injectable } from '@angular/core';
import { AuthApi } from '../base/auth';
import { Observable } from 'rxjs';
import { QueryApi } from '@convertedin/api';
import { AuthEndpoints } from '../constants/auth.constant';
import {
  ApplicationCountries,
  Register,
  UserData,
  Validations,
} from '../models/interfaces';
import { VendorData } from '../models/interfaces/vendor-data.interface';
import { Provider } from '../models/enums';

@Injectable()
export class AuthApiService extends AuthApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override changePassword(
    oldPassword: string,
    password: string,
    passwordConfirmation: string
  ): Observable<any> {
    return this.__queryApi.post(AuthEndpoints.CHANGE_PASSWORD, {
      oldPassword,
      password,
      passwordConfirmation,
    });
  }

  override forgotPassword(
    mobileNumber: string,
    countryCode: string,
    password: string,
    passwordConfirmation: string,
    otp: string
  ): Observable<{ data: UserData }> {
    return this.__queryApi.post(AuthEndpoints.FORGOT_PASSWORD, {
      mobileNumber,
      countryCode,
      otp,
      password,
      passwordConfirmation,
    });
  }

  override loginWithPassword(
    countryCode: string,
    mobileNumber: string,
    password: string
  ): Observable<{ data: UserData }> {
    return this.__queryApi.post(AuthEndpoints.LOGIN_WITH_PASSWORD, {
      countryCode,
      mobileNumber,
      password,
    });
  }

  override verifyOtpTwilio(
    countryCode: string,
    mobileNumber: string,
    otp: string
  ): Observable<any> {
    return this.__queryApi.post(AuthEndpoints.VERIFY_OTP_TWILIO, {
      countryCode,
      mobileNumber,
      otp,
    });
  }

  override verifyEmail(email: string): Observable<any> {
    return this.__queryApi.post(AuthEndpoints.VERIFY_EMAIL, {
      email,
    });
  }

  override getVendorData(): Observable<{ data: VendorData }> {
    return this.__queryApi.get(AuthEndpoints.VENDOR_DATA);
  }

  override changePhoneNumber(
    countryCode: string,
    mobileNumber: string,
    otp: string
  ): Observable<any> {
    return this.__queryApi.update(AuthEndpoints.CHANGE_NUMBER, {
      otp,
      mobileNumber,
      countryCode,
    });
  }

  override removeAccount(): Observable<any> {
    return this.__queryApi.delete(AuthEndpoints.DELETE_ACCOUNT);
  }

  override updateUserData(
    firstName?: string,
    lastName?: string,
    email?: string
  ): Observable<any> {
    return this.__queryApi.update(AuthEndpoints.UPDATE_USER_DATA, {
      firstName,
      lastName,
      email,
    });
  }

  override getValidations(): Observable<{ data: Validations }> {
    return this.__queryApi.get(AuthEndpoints.GET_VALIDATIONS);
  }
  // Get countries endpoint
  override getCountries(): Observable<ApplicationCountries> {
    return this.__queryApi.get(AuthEndpoints.COUNTRIES);
  }
  // Check mobile number endpoint
  override checkMobileNumber(number: {
    countryCode: string;
    mobileNumber: string;
  }): Observable<any> {
    return this.__queryApi.post(
      AuthEndpoints.MOBILE_CHECK,
      JSON.stringify(number)
    );
  }
  // Send OTP endpoint
  override sendOtp(
    countryCode: string,
    mobileNumber: string
  ): Observable<{ data: { otp: string; provider: Provider } }> {
    return this.__queryApi.post(AuthEndpoints.SEND_OTP, {
      countryCode,
      mobileNumber,
    });
  }
  // Verify OTP endpoint
  override verifyOtp(
    countryCode: string,
    mobileNumber: string,
    otp: string
  ): Observable<any> {
    return this.__queryApi.post(AuthEndpoints.VERIFY_OTP, {
      countryCode,
      mobileNumber,
      otp,
    });
  }
  // Login endpoint
  override login(
    countryCode: string,
    mobileNumber: string,
    otp: string
  ): Observable<{ data: UserData }> {
    return this.__queryApi.post(AuthEndpoints.LOGIN, {
      countryCode,
      mobileNumber,
      otp,
    });
  }
  // Register endpoint
  override register(data: Register): Observable<{ data: UserData }> {
    return this.__queryApi.post(AuthEndpoints.REGISTER, data);
  }
  // Logout endpoint
  override logout(): Observable<any> {
    return this.__queryApi.post(AuthEndpoints.LOGOUT, {});
  }
  // Get user data endpoint
  override getUserData(): Observable<{ data: UserData }> {
    return this.__queryApi.get(AuthEndpoints.USER_DATA);
  }
}
