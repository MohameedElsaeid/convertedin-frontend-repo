import { Injectable } from '@angular/core';
import { EmailTemplateApi } from '../base/email-template.base';
import { Observable } from 'rxjs';
import { QueryApi } from '@convertedin/api';
import { EmailTemplateEndpoints } from '../constants/email-template.constant';
import { ApiResponse, MetaPayload } from '@super-admin/shared/models';
import { CreateEmailTemplate, UploadImageResponse } from '../models';

@Injectable()
export class EmailTemplateService implements EmailTemplateApi {
  constructor(private __queryApi: QueryApi) {}

  uploadImage(image: FormData): Observable<UploadImageResponse> {
    return this.__queryApi.post(EmailTemplateEndpoints.UPLOAD_IMAGE, image);
  }

  createEmailTemplate(template: CreateEmailTemplate): Observable<any> {
    return this.__queryApi.post(
      EmailTemplateEndpoints.CREATE_TEMPLATE,
      template
    );
  }
  getAllTemplate(meta: MetaPayload): Observable<any> {
    return this.__queryApi.get(EmailTemplateEndpoints.GET_ALL_TEMPLATES, {
      params: { ...meta },
    });
  }
  getTemplateById(id: string): Observable<any> {
    return this.__queryApi.get(EmailTemplateEndpoints.GET_TEMPLATE_BY_ID(id));
  }
  changeTemplateStatus(id: string): Observable<any> {
    return this.__queryApi.update(
      EmailTemplateEndpoints.CHANGE_TEMPLATE_STATUS(id),
      {}
    );
  }
  deleteTemplate(id: string): Observable<any> {
    return this.__queryApi.delete(EmailTemplateEndpoints.DELETE_TEMPLATE(id));
  }
  updateTemplate(id: string, template: any): Observable<any> {
    return this.__queryApi.update(
      EmailTemplateEndpoints.UPDATE_TEMPLATE(id),
      template
    );
  }
}
