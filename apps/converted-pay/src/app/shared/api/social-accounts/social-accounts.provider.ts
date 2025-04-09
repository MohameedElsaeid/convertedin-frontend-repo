import { Provider } from '@angular/core';
import { SocialAccountsApiService } from './services/social-accounts.service';
import { SocialAccountsApi } from './base/social-accounts.base';

export const provideSocialAccountsApi: () => Provider = () => ({
  provide: SocialAccountsApi,
  useClass: SocialAccountsApiService,
});
