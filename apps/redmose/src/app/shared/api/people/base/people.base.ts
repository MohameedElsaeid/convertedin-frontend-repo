import { Observable } from 'rxjs';
import { CustomerDetails, Customers, Segment} from '../models/interfaces';
import { ApiResponse, TableSort } from '@redmose/shared/models/interfaces';
import { Source } from '../models/interfaces/source.interface';

export abstract class PeopleApi {
  abstract getCustomers(
    search?: string,
    per_page?: number | string,
    page?: number,
    sort?: TableSort,
    segment_id?: number,
    customer_source?: string
  ): Observable<Customers>;

  abstract uploadCustomersCsv(
    file: File,
    discard_duplicates?: boolean
  ): Observable<any>;

  /**
  * Gets a list of all segment groups
  */
  abstract getAllSegmentGroups(): Observable<{ data: Segment[] }>;

  abstract getAllSources(): Observable<{ data: Source[] }>;

  abstract getCustomerDetails(
    id: number
  ): Observable<ApiResponse<CustomerDetails>>;
}
