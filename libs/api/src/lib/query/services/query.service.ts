import { Injectable } from '@angular/core';
import { QueryApi } from '../base/query-api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Params, QueryApiOptions } from '../models';

@Injectable({
  providedIn: 'root',
})
export class QueryService implements QueryApi {
  constructor(private __httpClient: HttpClient) {}

  /**
   * Dispatches a http get request for the provided url
   * @param url Endpoint url
   * @param options Extra options to be sent with request (please refer to: https://angular.io/api/common/http/HttpClient)
   * @returns Returns an observable with response data
   */
  get(url: string, options?: QueryApiOptions): Observable<any> {
    return this.__httpClient.get(url, options);
  }

  /**
   * Dispatches a http post request for the provided url
   * @param url Endpoint url
   * @param data Data to be sent in request
   * @param options Extra options to be sent with request (please refer to: https://angular.io/api/common/http/HttpClient)
   * @returns Returns an observable with response data
   */
  post(url: string, data: any, options?: QueryApiOptions): Observable<any> {
    return this.__httpClient.post(url, data, options);
  }

  /**
   * Dispatches a http patch request for the provided url
   * @param url Endpoint url
   * @param data Data to be sent in request
   * @param options Extra options to be sent with request (please refer to: https://angular.io/api/common/http/HttpClient)
   * @returns Returns an observable with response data
   */
  patch(
    url: string,
    data: any,
    options?: QueryApiOptions | undefined
  ): Observable<any> {
    return this.__httpClient.patch(url, data, options);
  }

  /**
   * Dispatches a http delete request for the provided url
   * @param url Endpoint url
   * @param options Extra options to be sent with request (please refer to: https://angular.io/api/common/http/HttpClient)
   * @returns Returns an observable with response data
   */
  delete(url: string, options?: QueryApiOptions): Observable<any> {
    return this.__httpClient.delete(url, options);
  }

  /**
   * Dispatches a http put request for the provided url
   * @param url Endpoint url
   * @param data Data to be sent in request
   * @param options Extra options to be sent with request (please refer to: https://angular.io/api/common/http/HttpClient)
   * @returns Returns an observable with response data
   */
  update(url: string, data: any, options?: QueryApiOptions): Observable<any> {
    return this.__httpClient.put(url, data, options);
  }

  /**
   * Creates an `HttpParams` object from a given `Params` object.
   * Only keys with non-null and non-undefined values will be added.
   *
   * @param {Params} items - An object containing key-value pairs to be converted to `HttpParams`.
   * @returns {HttpParams} - The resulting `HttpParams` object with the provided key-value pairs.
   */
  createParams(items: Params): HttpParams {
    let params = new HttpParams();

    Object.entries(items).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params = params.append(key, value.toString());
      }
    });

    return params;
  }
}
