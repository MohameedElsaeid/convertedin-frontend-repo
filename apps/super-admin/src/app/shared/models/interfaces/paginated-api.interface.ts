import { ApiResponse } from './api.interface';

export interface paginatedApiResponse<T> extends ApiResponse<T> {
  meta: MetaApi;
}

export interface MetaApi {
  links: {
    first: string;
    last: string;
    next: string;
    prev: string | null;
  };
  meta: {
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    current_page: number;
    per_page: number;
    last_page: number;
    total: number;
    from: number;
    to: number;
  };
}

export interface MetaPayload {
  per_page: number;
  page: number;
  [key: string]: any;
}
