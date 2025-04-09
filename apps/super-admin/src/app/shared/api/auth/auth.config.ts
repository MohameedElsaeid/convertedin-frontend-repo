import { Provider } from "@angular/core"
import { AuthApi } from "./base/auth.base"
import { AuthService } from "./services/auth.service"

export function ProvideAuthApi(): Provider {
  return {
    provide: AuthApi,
    useClass: AuthService
  }
}