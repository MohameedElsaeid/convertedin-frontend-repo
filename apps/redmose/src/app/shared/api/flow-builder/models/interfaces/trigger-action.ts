import { PeriodType } from '../enums';

export interface TriggerAction {
  start_condition: number;
  stop_condition: number;
  flow_entrance?: number;
  flow_entrance_type?: PeriodType;
}
