import { createActionGroup, props } from '@ngrx/store';
import { FlowBuilderActions } from '../models/flow-builder.enum';
import { FlowAction } from '@redmose/shared/api';

export const flowBuilderActions = createActionGroup({
  source: 'Flow Builder',
  events: {
    [FlowBuilderActions.SET_FLOW_TRIGGERS]: props<{
      flowActions: Array<FlowAction>;
    }>(),
  },
});
