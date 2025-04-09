import {
  createFeature,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { CreateAiMediaState } from '../models/create-ai-media-state.interface';
import { StoreKeys } from '@flyerz/store/store-keys.enum';
import { createAiMediaReducer } from '../reducer/create-ai-media.reducer';

const selectCreateAiMedia = createFeatureSelector<CreateAiMediaState>(
  StoreKeys.CREATE_AI_MEDIA
);

export const selectAiMediaTemplate = createSelector(
  selectCreateAiMedia,
  (state) => state.template
);

export const selectAllAiMedia = createSelector(
  selectCreateAiMedia,
  (state) => state
);

export const createAiMediaFeature = createFeature({
  name: StoreKeys.CREATE_AI_MEDIA,
  reducer: createAiMediaReducer,
});
