import { Observable } from 'rxjs';
import {
  ApplicationCountries,
  Register,
  UserData,
  Validations,
} from '../models/interfaces';
import { VendorData } from '../models/interfaces/vendor-data.interface';
import { Provider } from '../models/enums/provider.enum';

export abstract class AuthApi {
  /**
   * Changes currently logged in user password
   * @param oldPassword Current user old password
   * @param password New password
   * @param passwordConfirmation New password confirmation
   */
  abstract changePassword(
    oldPassword: string,
    password: string,
    passwordConfirmation: string
  ): Observable<any>;

  /**
   * Changes user password in auth pages
   * @param mobileNumber Phone number to reset password for
   * @param countryCode Country code of designated phone number
   * @param password New password to be changed
   * @param passwordConfirmation New password confirmation
   * @param otp Verified OTP to change password
   */
  abstract forgotPassword(
    mobileNumber: string,
    countryCode: string,
    password: string,
    passwordConfirmation: string,
    otp: string
  ): Observable<{ data: UserData }>;

  /**
   * User login with password request, used based on checkMobileNumber status
   * @param countryCode Country code of entered phone number
   * @param mobileNumber Phone number without country code
   * @param password Password of user to be logged in
   */
  abstract loginWithPassword(
    countryCode: string,
    mobileNumber: string,
    password: string
  ): Observable<{ data: UserData }>;

  /**
   * Verify OTP recieved by user in case provider is twilio
   * @param countryCode Country code of entered phone number
   * @param mobileNumber Phone number without country code
   * @param otp Recieved OTP
   */
  abstract verifyOtpTwilio(
    countryCode: string,
    mobileNumber: string,
    otp: string
  ): Observable<any>;

  /**
   * Sends an email to user to verify his email
   * @param email Email to be verified
   */
  abstract verifyEmail(email: string): Observable<any>;

  /**
   * Returns vendor configuration for flyerz
   */
  abstract getVendorData(): Observable<{ data: VendorData }>;

  /**
   * Changes current user phone number
   * @param countryCode Country code of new phone
   * @param mobileNumber New phone number
   * @param otp OTP for new phone number
   */
  abstract changePhoneNumber(
    countryCode: string,
    mobileNumber: string,
    otp: string
  ): Observable<any>;

  /**
   * Removes current logged in user account
   */
  abstract removeAccount(): Observable<any>;

  /**
   * Updates user profile data
   * @param firstName User first name
   * @param lastName User last name
   * @param email User email
   */
  abstract updateUserData(
    firstName?: string,
    lastName?: string,
    email?: string
  ): Observable<any>;

  /**
   * Gets list of supported countries for flyerz project
   */
  abstract getCountries(): Observable<ApplicationCountries>;

  /**
   * Checks status of entered phone number, status may be either registered or not registered
   * @param number
   */
  abstract checkMobileNumber(number: {
    countryCode: string;
    mobileNumber: string;
  }): Observable<any>;

  /**
   * Sends OTP code to entered number
   * @param countryCode Country code of entered phone number
   * @param mobileNumber Phone number without country code
   */
  abstract sendOtp(
    countryCode: string,
    mobileNumber: string
  ): Observable<{ data: { otp: string; provider: Provider } }>;

  /**
   * Verify OTP recieved by user
   * @param countryCode Country code of entered phone number
   * @param mobileNumber Phone number without country code
   * @param otp Recieved OTP
   */
  abstract verifyOtp(
    countryCode: string,
    mobileNumber: string,
    otp: string
  ): Observable<any>;

  /**
   * User login request, used based on checkMobileNumber status
   * @param countryCode Country code of entered phone number
   * @param mobileNumber Phone number without country code
   * @param otp Recieved OTP
   * @returns User data
   */
  abstract login(
    countryCode: string,
    mobileNumber: string,
    otp: string
  ): Observable<{ data: UserData }>;

  /**
   * Register user request, auto logs user in
   * @param data Data of user to register
   */
  abstract register(data: Register): Observable<{ data: UserData }>;

  /**
   * Logout request
   */
  abstract logout(): Observable<any>;

  /**
   * Gets current logged in user data, used in case user is logged in
   */
  abstract getUserData(): Observable<{ data: UserData }>;

  /**
   * Gets current user validations for all app actions
   */
  abstract getValidations(): Observable<{ data: Validations }>;
}
