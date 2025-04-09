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
import { ApiResponse } from '@pinads/shared/models';
import { Category } from '../constants';

export abstract class AuthApi {
  /**
   * Performs a login operation.
   *
   * @param {Login} data - The login data containing email and password entered by the user during login.
   * @returns {Observable<ApiResponse<User>>} - An Observable that emits values of type `ApiResponse<LoginResponse>`.
   */
  abstract login(data: Login): Observable<ApiResponse<User>>;

  /**
   * Registers a user with the provided data.
   *
   * @param {Register} data - The registration data for the user.
   * @returns {Observable<ApiResponse<User>>} - An Observable that emits values of type `ApiResponse<RegisterResponse>`.
   */
  abstract register(data: Register): Observable<ApiResponse<User>>;

  /**
   * Logs out the current user.
   *
   * @returns {Observable<ApiResponse<object>>} - An Observable that emits values of type `ApiResponse<object>`.
   */
  abstract logout(): Observable<ApiResponse<object>>;

  /**
   * Verifies the One Time Password (OTP).
   *
   * @returns {Observable<ApiResponse<object>>} - An Observable that emits values of type `ApiResponse<object>`.
   */
  abstract verifyOTP(code: string): Observable<ApiResponse<object>>;

  /**
   * Resends the One Time Password (OTP).
   *
   * @returns {Observable<ApiResponse<object>>} - An Observable that emits values of type `ApiResponse<object>`.
   */
  abstract resendOTP(): Observable<ApiResponse<object>>;

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
   * Refreshes a token using the provided Google token.
   *
   * @param {string} google_token - The Google token used for refreshing the token.
   * @returns {Observable<ApiResponse<object>>} - An observable containing the response of refreshing the token.
   */

  abstract refreshToken(google_token: string): Observable<ApiResponse<object>>;

  /**
   * Checks the validity of a Google token.
   *
   * @returns {Observable<ApiResponse<GoogleCheckConnectionResponse>>} - An observable containing the response of checking the Google token.
   */
  abstract checkGoogleToken(): Observable<
    ApiResponse<GoogleCheckConnectionResponse>
  >;

  /**
   * Initiates the connection process with Google.
   *
   * @returns {Observable<ApiResponse<{ google_connect_url: string }>>} - An observable containing the response with the Google connection URL.
   */
  abstract googleConnect(): Observable<
    ApiResponse<{ google_connect_url: string }>
  >;

  /**
   * Sends a request to reset the password for the specified email address.
   * Will send otp to specified email address
   *
   * @param {string} email - The email address for which the password reset request is made.
   * @returns {Observable<ApiResponse<object>>} - An observable containing the response to the password reset request.
   */
  abstract forgotPassword(email: string): Observable<ApiResponse<object>>;

  /**
   * Verifies the password reset request with the provided data.
   *
   * @param {ForgotPasswordVerifyPayload} data - The payload containing the necessary information to verify the password reset request.
   * @returns {Observable<ApiResponse<{ token: string }>>} - An observable containing the response with the verification token.
   */
  abstract forgotPasswordVerify(
    data: ForgotPasswordVerifyPayload
  ): Observable<ApiResponse<{ token: string }>>;

  /**
   * Resets the password based on the provided data.
   *
   * @param {ResetPasswordPayload} data - The payload containing the new password.
   * @param {string} token - verification token.
   * @returns {Observable<ApiResponse<object>>} - An observable containing the response to the password reset operation.
   */
  abstract resetPassword(
    token: string,
    data: ResetPasswordPayload
  ): Observable<ApiResponse<object>>;

  abstract getCategories(): Observable<ApiResponse<Category[]>>;

  abstract impersonateLogin(
    impersonate_token: string
  ): Observable<ApiResponse<User>>;

  abstract getUser(): Observable<ApiResponse<User>>;
}
