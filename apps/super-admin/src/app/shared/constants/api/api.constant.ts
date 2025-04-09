import { environment } from '../../../../environment/environment';

export class ApiConstants {
  static readonly API = '/api/admins';
  static readonly VERSION = (version: number) => `/v${version}`;
  static readonly INITIAL = environment.remoteUrl + this.API;
}
