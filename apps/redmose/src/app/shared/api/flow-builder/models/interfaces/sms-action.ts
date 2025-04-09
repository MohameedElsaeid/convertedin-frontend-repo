import { GeneralAction } from './general-action';

export interface SMSAction extends GeneralAction {
  name: string;
  body: string;
  preview_body?: string;
}
