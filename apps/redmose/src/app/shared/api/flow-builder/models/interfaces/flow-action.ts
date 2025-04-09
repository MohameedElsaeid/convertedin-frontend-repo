import { FlowActionType, WorkFlowAction } from '../enums';

export interface FlowAction {
  id: number;
  name: string;
  type: FlowActionType;
  channel_type: WorkFlowAction;
  order: number;
  slug: string;
  status: boolean;
}
