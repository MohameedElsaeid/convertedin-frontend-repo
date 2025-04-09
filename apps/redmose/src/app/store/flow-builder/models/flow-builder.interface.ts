import { FlowAction } from '@redmose/shared/api';

export interface FlowBuilderState {
  flowActions: Array<FlowAction> | undefined;
}
