import { Injectable } from '@angular/core';
import { PeopleApi } from '../base/people.base';
import { QueryApi } from '@convertedin/api';
import { Observable } from 'rxjs';
import { PeopleEndpoints } from '../constants/people.constant';
import { CustomerDetails, Customers, Segment, Source } from '../models/interfaces';
import { ApiResponse, TableSort } from '@redmose/shared/models/interfaces';

@Injectable()
export class PeopleApiService extends PeopleApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override getCustomerDetails(
    id: number
  ): Observable<ApiResponse<CustomerDetails>> {
    return this.__queryApi.get(PeopleEndpoints.CUSTOMER_DETAILS(id));
  }

  override uploadCustomersCsv(
    file: File,
    discard_duplicates?: boolean
  ): Observable<any> {
    const formData = new FormData();
    formData.append('customers_csv', file);
    formData.append('discard_duplicates', `${!!discard_duplicates}`);
    return this.__queryApi.post(PeopleEndpoints.UPLOAD_CUSTOMERS_CSV, formData);
  }

  override getCustomers(
    search?: string,
    per_page?: number,
    page?: number | string,
    sort?: TableSort,
    segment_id?: number,
    customer_source?: string
  ): Observable<Customers> {
    const sortKey = sort ? `sort[${sort.key}]` : '';
    return this.__queryApi.get(PeopleEndpoints.GET_ALL_CUSTOMERS, {
      params: {
        search,
        per_page,
        page,
        [sortKey]: sort?.sortMode,
        customer_source,
        // segment_id,
      },
    });
  }

  override getAllSegmentGroups(): Observable<{ data: Segment[] }> {
    return this.__queryApi.get(PeopleEndpoints.GET_ALL_SEGMENTS_GROUPS);
  }

  override getAllSources(): Observable<{ data: Source[] }> {
    return this.__queryApi.get(PeopleEndpoints.GET_ALL_SOURCES);
  }
}
