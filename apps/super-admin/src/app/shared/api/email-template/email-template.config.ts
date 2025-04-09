import { Provider } from "@angular/core"
import { EmailTemplateService } from "./services/email-template.service"
import { EmailTemplateApi } from "./base/email-template.base"

export function ProvideEmailTemplateApi(): Provider {
  return {
    provide: EmailTemplateApi,
    useClass: EmailTemplateService
  }
}