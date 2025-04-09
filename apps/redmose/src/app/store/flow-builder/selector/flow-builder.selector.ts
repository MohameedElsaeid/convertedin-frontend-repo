import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlowBuilderState } from '../models/flow-builder.interface';

const flowBuilderSelector =
  createFeatureSelector<FlowBuilderState>('flowBuilder');

export const selectTriggers = createSelector(
  flowBuilderSelector,
  (state) => state.flowActions
);
