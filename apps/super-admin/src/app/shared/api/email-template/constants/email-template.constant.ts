import { ApiConstants } from '@super-admin/shared/constants/api/api.constant';

export class EmailTemplateEndpoints {
  static readonly GET_ALL_TEMPLATES =
    ApiConstants.INITIAL +
    '/templates/template-design';

  static readonly GET_TEMPLATE_BY_ID = (templateId: string) =>
    ApiConstants.INITIAL +
    `/templates/template-design/${templateId}`;

  static readonly UPDATE_TEMPLATE = (templateId: string) =>
    ApiConstants.INITIAL +
    `/templates/template-design/${templateId}`;

  static readonly DELETE_TEMPLATE = (templateId: string) =>
    ApiConstants.INITIAL +
    `/templates/template-design/${templateId}`;

  static readonly CREATE_TEMPLATE =
    ApiConstants.INITIAL +
    '/templates/template-design';

  static readonly CHANGE_TEMPLATE_STATUS = (templateId: string) =>
    ApiConstants.INITIAL +
    `/templates/template-design/${templateId}/status`;

    static readonly UPLOAD_IMAGE=ApiConstants.INITIAL +'/templates/upload-template-image'

}
