import { Currency } from './currency.interfacee';

export interface CountryItem {
  id: number;
  name: string;
  key: string;
  currency: Currency;
}
