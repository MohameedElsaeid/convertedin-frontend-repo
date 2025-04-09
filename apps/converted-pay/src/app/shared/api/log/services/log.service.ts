import { Injectable } from '@angular/core';
import { QueryApi } from '@convertedin/api';
import { LogApi } from '../base/log.base';
import { Observable } from 'rxjs';
import { LogEndPoints } from '../constants/log.constants';

@Injectable()
export class LogApiService extends LogApi {
  constructor(private queryApi: QueryApi) {
    super();
  }
  override trackEvents(event: string, metadata: any): Observable<object> {
    return this.queryApi.post(LogEndPoints.EVENTS_LOG, { event, metadata });
  }
  override errorLog(exception: string): Observable<object> {
    return this.queryApi.post(LogEndPoints.ERROR_LOG, { exception });
  }
}
