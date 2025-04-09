export interface ProximityLocation {
  latitude_in_micro_degrees: number;
  longitude_in_micro_degrees: number;
  radius: number;
  radius_units: 'KILOMETERS' | 'MILES'; // KILOMETERS,MILES
  formatted_address?:string
}
