import { Provider } from "@angular/core";
import { NotificationApi } from "./base";
import { NotificationApiService } from "./services/notification.service";

export function ProvideNotificationService(): Provider {
    return {
      provide: NotificationApi,
      useClass: NotificationApiService
    }
  }