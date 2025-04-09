import { Injectable } from '@angular/core';
import { QueryApi } from '@convertedin/api';
import { KeywordPlanerApi } from '../base/keyword-planer-api.base';
import { Observable } from 'rxjs';
import { KeywordPlanerEndpoints } from '../constants/keyword-planer.contants';
import { KeywordPlanerPayload, KeywordPlanerResponse } from '../models';
import { ApiResponse } from '@pinads/shared/models';

@Injectable({
  providedIn: 'root',
})
export class KeywordPlanerService implements KeywordPlanerApi {
  constructor(private queryApi: QueryApi) {}
  getKeywordPlaner(
    keywordPlanerPayload: KeywordPlanerPayload
  ): Observable<ApiResponse<KeywordPlanerResponse>> {
    return this.queryApi.post(
      KeywordPlanerEndpoints.GET_KEYWORD_PLANER,
      keywordPlanerPayload
    );
  }
}
