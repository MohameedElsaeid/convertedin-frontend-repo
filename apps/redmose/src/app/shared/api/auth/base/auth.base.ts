import { ApiResponse } from '@redmose/shared/models/interfaces';
import { Observable } from 'rxjs';
import { UserData } from '../models/interfaces';

export abstract class AuthApi {
  abstract logout(): Observable<void>;

  abstract userData(): Observable<ApiResponse<UserData>>;
}
