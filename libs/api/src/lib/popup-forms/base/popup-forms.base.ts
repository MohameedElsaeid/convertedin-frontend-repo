import {Observable} from 'rxjs';

export abstract class PopupFormsApi {
  abstract fetchPopupFormsList(): Observable<any>
}
