import { WorkFlowAction } from '@redmose/shared/api';

export interface ActiveAction {
  type: WorkFlowAction;
  index: number;
}
