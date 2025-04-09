import {Injectable} from '@angular/core';
import {PopupFormsApi} from '../base/popup-forms.base';
import {Observable} from 'rxjs';
import {QueryApi} from '../../query/base/query-api';
import {Endpoints} from '../../constants/endpoints';

@Injectable()
export class PopupFormsService implements PopupFormsApi {

  constructor(private QueryApi: QueryApi) {
  }

  fetchPopupFormsList(): Observable<any> {
    return this.QueryApi.get(Endpoints.POPUP_FORMS_LIST)
  }

}
