import { Observable } from 'rxjs';
import { CreateEmailTemplate, EmailTemplate, UploadImageResponse } from '../models';
import {
  ApiResponse,
  MetaPayload,
  paginatedApiResponse,
} from '@super-admin/shared/models';

export abstract class EmailTemplateApi {
  abstract getAllTemplate(
    meta: MetaPayload
  ): Observable<paginatedApiResponse<EmailTemplate[]>>;
  abstract getTemplateById(
    id: string
  ): Observable<ApiResponse<{ data: EmailTemplate }>>;
  abstract changeTemplateStatus(
    id: string
  ): Observable<ApiResponse<EmailTemplate>>;
  abstract deleteTemplate(
    id: string
  ): Observable<ApiResponse<{ data: boolean }>>;
  abstract updateTemplate(
    id: string,
    template: CreateEmailTemplate
  ): Observable<ApiResponse<EmailTemplate>>;
  abstract createEmailTemplate(
    template: CreateEmailTemplate
  ): Observable<ApiResponse<EmailTemplate>>;
  abstract uploadImage(
    image: FormData
  ): Observable<UploadImageResponse>;
}
