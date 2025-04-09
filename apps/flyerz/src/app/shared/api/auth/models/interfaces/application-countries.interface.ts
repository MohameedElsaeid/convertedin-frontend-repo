import { ApplicationCountry } from './application-country.interface';

export interface ApplicationCountries {
  data: {
    countries: Array<ApplicationCountry>;

    defaultCountry: {
      key: string;
      city: string;
    };
  };
}
