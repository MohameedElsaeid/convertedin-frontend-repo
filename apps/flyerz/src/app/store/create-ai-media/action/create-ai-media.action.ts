import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateAiMediaActionTypes } from '../models/create-ai-media-actions.enum';
import { AiTemplate } from '@flyerz/shared/api';

export const CreateAiMediaActions = createActionGroup({
  source: 'Create Ai Media',
  events: {
    [CreateAiMediaActionTypes.SET_TEMPLATE]: props<{ template: AiTemplate }>(),

    [CreateAiMediaActionTypes.SET_USER_IMAGE]: props<{
      imageFile: File;
      imagePreview: string;
    }>(),

    [CreateAiMediaActionTypes.RESET_USER_IMAGE]: emptyProps(),

    [CreateAiMediaActionTypes.RESET]: emptyProps(),
  },
});
