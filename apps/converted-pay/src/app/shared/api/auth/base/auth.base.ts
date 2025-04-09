import { ApiResponse } from '@converted-pay/shared/models/interfaces';
import { Observable } from 'rxjs';
import {
  CompleteRegisterPayload,
  CountryItem,
  FBCampaignData,
  LoginPayload,
  RegisterPayload,
  UpdatePasswordPayload,
  UserData,
  VerifyOtpPayload,
} from '../models';
import {
  GoogleTokenPayload,
  GoogleTokenResponse,
} from '../models/interfaces/google-auth.interface';

export abstract class AuthApi {
  /**
   * Performs a login operation.
   *
   * @param {LoginPayload} loginPayload - The login data containing email and password entered by the user during login.
   * @returns {Observable<ApiResponse<UserData>>} - An Observable that emits values of type `ApiResponse<UserData>`.
   */
  abstract login(loginPayload: LoginPayload): Observable<ApiResponse<UserData>>;

  /**
   * Performs a user registration operation.
   *
   * @param {RegisterPayload} registerPayload - The registration data containing user details.
   * @returns {Observable<ApiResponse<UserData>>} - An Observable that emits values of type `ApiResponse<UserData>`.
   */
  abstract register(
    registerPayload: RegisterPayload
  ): Observable<ApiResponse<UserData>>;

  /**
   * Completes the user registration process.
   *
   * @param {CompleteRegisterPayload} completeRegisterPayload - The data required to complete user registration.
   * @returns {Observable<ApiResponse<UserData>>} - An Observable that emits values of type `ApiResponse<UserData>`.
   */
  abstract completeRegister(
    completeRegisterPayload: CompleteRegisterPayload
  ): Observable<ApiResponse<UserData>>;

  /**
   * Retrieves the user profile data.
   *
   * @returns {Observable<ApiResponse<UserData>>} - An Observable that emits values of type `ApiResponse<UserData>`.
   */
  abstract getUserProfile(): Observable<ApiResponse<UserData>>;

  /**
   * Retrieves a Google token based on the provided GoogleTokenPayload.
   *
   * @param {GoogleTokenPayload} data - The payload containing the necessary data for generating the Google token.
   * @returns {Observable<ApiResponse<GoogleTokenResponse>>} - An observable containing the response containing the generated Google token.
   */
  abstract getGoogleToken(
    data: GoogleTokenPayload
  ): Observable<GoogleTokenResponse>;
  /**
   * Sends an OTP to the provided email address.
   *
   * @param {string} email - The email address to which the OTP will be sent.
   * @returns {Observable<ApiResponse<object>>} - An observable containing the response of sending the OTP.
   */
  abstract sendOtp(email: string): Observable<ApiResponse<object>>;

  /**
   * Verifies the OTP with the provided data.
   *
   * @param {VerifyOtpPayload} data - The payload containing the OTP and related data for verification.
   * @returns {Observable<ApiResponse<object>>} - An observable containing the response of OTP verification.
   */
  abstract verifyOtp(data: VerifyOtpPayload): Observable<ApiResponse<object>>;

  /**
   * Updates the password based on the provided UpdatePasswordPayload.
   *
   * @param {UpdatePasswordPayload} data - The payload containing the new password and related data for updating the password.
   * @returns {Observable<ApiResponse<object>>} - An observable containing the response of updating the password.
   */
  abstract updatePassword(
    data: UpdatePasswordPayload
  ): Observable<ApiResponse<object>>;

  /**
   * Updates the Facebook campaign data based on the provided FBCampaignData.
   *
   * @param {FBCampaignData} data - The payload containing the updated Facebook campaign data.
   * @returns {Observable<ApiResponse>} - An observable containing the response of updating the Facebook campaign data. */
  abstract updateFBCampaignData(
    data: FBCampaignData
  ): Observable<ApiResponse<object>>;

  /**
   * Retrieves a list of countries.
   *
   * @returns {Observable<ApiResponse<Array<CountryItem>>>} An observable containing the response with a list of countries.
   */
  abstract getCountryList(): Observable<ApiResponse<Array<CountryItem>>>;
}
