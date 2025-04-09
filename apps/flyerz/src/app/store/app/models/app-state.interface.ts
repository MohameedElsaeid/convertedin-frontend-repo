import { ConnectionDetails, UserData, Validations } from '@flyerz/shared/api';

export interface AppState {
  countryId: number;
  userData: UserData | undefined;
  token: string | undefined;
  facebookAccessToken: string | undefined;
  connectionDetails: ConnectionDetails;
  validations: Validations | undefined;
}
