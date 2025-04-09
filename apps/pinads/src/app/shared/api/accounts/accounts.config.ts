import { Provider } from "@angular/core"
import { AccountsApi } from "./base/accounts"
import { AccountsService } from "./services/accounts.service"

export function ProvideAccountsService(): Provider {
  return {
    provide: AccountsApi,
    useClass: AccountsService
  }
}
