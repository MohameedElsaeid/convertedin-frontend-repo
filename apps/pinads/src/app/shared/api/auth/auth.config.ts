import { Provider } from "@angular/core"
import { AuthApi } from "./base/auth"
import { AuthService } from "./services/auth.service"

export function ProvideAuthService(): Provider {
  return {
    provide: AuthApi,
    useClass: AuthService
  }
}
