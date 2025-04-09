import { WorkFlowAction, PeriodType } from '../enums';

export interface GeneralAction {
  type: WorkFlowAction;
  send_after?: number;
  send_after_type?: PeriodType;
}
