import { ApiConstants } from '@converted-pay/shared/constants';

export class LogEndPoints {
  static readonly ERROR_LOG = ApiConstants.INITIAL + '/log-errors';
  static readonly EVENTS_LOG = ApiConstants.INITIAL + '/events';
}
