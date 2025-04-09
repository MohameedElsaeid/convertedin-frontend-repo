import { Observable } from 'rxjs';
import { Params, QueryApiOptions } from '../models';
import { HttpParams } from '@angular/common/http';

export abstract class QueryApi {
  /**
   * Dispatches a http get request for the provided url
   * @param url Endpoint url
   * @param options Extra options to be sent with request (please refer to: https://angular.io/api/common/http/HttpClient)
   * @returns Returns an observable with response data
   */
  abstract get(url: string, options?: QueryApiOptions): Observable<any>;

  /**
   * Dispatches a http post request for the provided url
   * @param url Endpoint url
   * @param data Data to be sent in request
   * @param options Extra options to be sent with request (please refer to: https://angular.io/api/common/http/HttpClient)
   * @returns Returns an observable with response data
   */
  abstract post(
    url: string,
    data: any,
    options?: QueryApiOptions
  ): Observable<any>;

  /**
   * Dispatches a http patch request for the provided url
   * @param url Endpoint url
   * @param data Data to be sent in request
   * @param options Extra options to be sent with request (please refer to: https://angular.io/api/common/http/HttpClient)
   * @returns Returns an observable with response data
   */
  abstract patch(
    url: string,
    data: any,
    options?: QueryApiOptions
  ): Observable<any>;

  /**
   * Dispatches a http delete request for the provided url
   * @param url Endpoint url
   * @param options Extra options to be sent with request (please refer to: https://angular.io/api/common/http/HttpClient)
   * @returns Returns an observable with response data
   */
  abstract delete(url: string, options?: QueryApiOptions): Observable<any>;

  /**
   * Dispatches a http put request for the provided url
   * @param url Endpoint url
   * @param data Data to be sent in request
   * @param options Extra options to be sent with request (please refer to: https://angular.io/api/common/http/HttpClient)
   * @returns Returns an observable with response data
   */
  abstract update(
    url: string,
    data: any,
    options?: QueryApiOptions
  ): Observable<any>;

  /**
   * Creates an `HttpParams` object from a given `Params` object.
   * Only keys with non-null and non-undefined values will be added.
   *
   * @param {Params} items - An object containing key-value pairs to be converted to `HttpParams`.
   * @returns {HttpParams} - The resulting `HttpParams` object with the provided key-value pairs.
   */
  abstract createParams(items: Params): HttpParams;
}
