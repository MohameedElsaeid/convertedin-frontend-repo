export interface Pagination<T> {
  offset: number;
  limit: number;
  data?: Array<T>;
  reachedTotalCount: boolean;
  sort?: any;
  query?: string;
  next?: string;
}
