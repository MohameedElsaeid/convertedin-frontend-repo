import { createReducer, on } from '@ngrx/store';
import { FlowBuilderState } from '../models/flow-builder.interface';
import { flowBuilderActions } from '../action/flow-builder.action';

const flowBuilderInitialState: FlowBuilderState = {
  flowActions: undefined,
};

export const flowBuilderReducer = createReducer(
  flowBuilderInitialState,

  // Set flow triggers
  on(flowBuilderActions.setFlowTriggers, (state, { flowActions }) => ({
    ...state,
    flowActions,
  }))
);
