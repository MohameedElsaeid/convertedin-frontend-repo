import { createReducer, on } from '@ngrx/store';
import { CreateAiMediaState } from '../models/create-ai-media-state.interface';
import { CreateAiMediaActions } from '../action/create-ai-media.action';

const initialState: CreateAiMediaState = {
  template: undefined,
  imageFile: undefined,
  imagePreview: undefined,
};

export const createAiMediaReducer = createReducer(
  initialState,

  // Sets media template
  on(CreateAiMediaActions.setCreateAiMediaTemplate, (state, { template }) => ({
    ...state,
    template,
  })),

  // Sets user image
  on(
    CreateAiMediaActions.setCreateAiMediaUserImage,
    (state, { imageFile, imagePreview }) => ({
      ...state,
      imageFile,
      imagePreview,
    })
  ),

  // Reset user image
  on(CreateAiMediaActions.resetCreateAiMediaUserImage, (state) => ({
    ...state,
    imageFile: undefined,
    imagePreview: undefined,
  })),

  // Reset state
  on(CreateAiMediaActions.resetCreateAiMedia, () => ({
    imageFile: undefined,
    imagePreview: undefined,
    template: undefined,
  }))
);
