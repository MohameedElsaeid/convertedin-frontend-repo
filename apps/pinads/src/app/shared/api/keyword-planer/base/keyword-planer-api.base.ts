import { Observable } from 'rxjs';
import { KeywordPlanerPayload, KeywordPlanerResponse } from '../models';
import { ApiResponse } from '@pinads/shared/models';

export abstract class KeywordPlanerApi {
  abstract getKeywordPlaner(
    keywordPlanerPayload: KeywordPlanerPayload
  ): Observable<ApiResponse<KeywordPlanerResponse>>;
}
