import { Provider } from '@angular/core';
import { CreateAiMediaApi } from './base/create-ai-media.base';
import { CreateAiMediaService } from './services/create-ai-media.service';

export const provideCreateAiMediaApi: () => Provider = () => ({
  provide: CreateAiMediaApi,
  useClass: CreateAiMediaService,
});
