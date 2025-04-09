export interface MetaPayload {
  per_page: number;
  page: number;
  from_date?: string;
  to_date?: string;
  [key: string]: any;
}
