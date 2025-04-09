import { AiTemplate } from '@flyerz/shared/api';

export interface CreateAiMediaState {
  template: undefined | AiTemplate;
  imageFile: File | undefined;
  imagePreview: string | undefined;
}
