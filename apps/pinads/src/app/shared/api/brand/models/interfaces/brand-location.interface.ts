export interface BrandLocation {
  id: string;
  brand_id: number;
  resource_id: string;
  title: string;
  website_url: string;
  postal_address?: PostalAddress;
  geo_address?: GeoAddress;
  phone_number?:string;
  location?:string,
  has_access:boolean
}
export interface PostalAddress {
  addressLines: string[];
  languageCode: string;
  locality: string;
  postalCode: string;
  regionCode: string;
  resource_id: string;
}

export interface GeoAddress {
  latitude: number;
  longitude: number;
}
