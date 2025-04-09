import { LocationItem } from './location-item.interface';

export interface CountryItem extends LocationItem {
  flag: string;
  key: string;
}
