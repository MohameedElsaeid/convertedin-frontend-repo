import { Observable } from "rxjs";
import { LoginPayload, LoginResponse } from "../models";
import { ApiResponse } from "@super-admin/shared/models";

export abstract class AuthApi{
    abstract login(loginPayload: LoginPayload): Observable<ApiResponse<LoginResponse>>;
    abstract logout(): Observable<Object>
}