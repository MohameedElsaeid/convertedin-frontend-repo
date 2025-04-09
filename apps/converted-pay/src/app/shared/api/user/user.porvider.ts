import { Provider } from "@angular/core";
import { UserApi } from "./base/user.base";
import { UserApiService } from "./services/user.service";

export const provideUserApi: () => Provider = () => ({
    provide: UserApi,
    useClass: UserApiService,
  });