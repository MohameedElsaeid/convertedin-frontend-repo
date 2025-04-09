import { NotificationAction } from './notification-action.interface';
import { SMSAction } from './sms-action';
import { TriggerAction } from './trigger-action';
import { WorkflowMetaData } from './workflow-meta-data';

export interface Workflow extends TriggerAction, WorkflowMetaData {
  steps: Array<SMSAction | NotificationAction>;
}

export type WorkflowStep = SMSAction | NotificationAction;
