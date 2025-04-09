import { Provider } from '@angular/core';
import { PeopleApi } from './base/people.base';
import { PeopleApiService } from './services/people.service';

export const providePeopleApi: () => Provider = () => ({
  provide: PeopleApi,
  useClass: PeopleApiService,
});
