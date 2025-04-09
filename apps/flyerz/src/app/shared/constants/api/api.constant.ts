import { environment } from '../../../../environment/environment';

export class ApiConstants {
  static readonly API = '/api';
  static readonly VERSION = (version: number) => `/v${version}`;
  static readonly SDK = '/sdk';
  static readonly INITIAL = environment.remoteUrl + this.SDK + this.API;
}
