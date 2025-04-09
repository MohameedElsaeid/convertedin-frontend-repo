import { QueryApi } from '@convertedin/api';
import { CreateAiMediaApi } from '../base/create-ai-media.base';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateAiMediaEndpoints } from '../constants/create-ai-media.constant';
import {
  AiServiceItem,
  AiTemplate,
  AiTemplateDetails,
} from '../models/interfaces';

@Injectable()
export class CreateAiMediaService extends CreateAiMediaApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override getUserVideos(): Observable<any> {
    return this.__queryApi.get(CreateAiMediaEndpoints.GET_USER_VIDEOS);
  }

  override getUserImages(
    offset?: number,
    limit?: number
  ): Observable<{ data: Array<AiServiceItem> }> {
    return this.__queryApi.get(CreateAiMediaEndpoints.GET_USER_IMAGES, {
      params: { limit: limit!, offset: offset! },
    });
  }

  override getImageTemplates(
    offset?: number,
    limit?: number
  ): Observable<{ data: AiTemplate[] }> {
    return this.__queryApi.get(CreateAiMediaEndpoints.GET_IMAGE_TEMPLATES, {
      params: { limit: limit!, offset: offset! },
    });
  }

  override getImageTemplate(
    templateId: number
  ): Observable<{ data: AiTemplateDetails }> {
    return this.__queryApi.get(
      CreateAiMediaEndpoints.GET_IMAGE_TEMPLATE(templateId)
    );
  }

  override createImage(image: File, templateId: number): Observable<any> {
    return this.__queryApi.post(
      CreateAiMediaEndpoints.CREATE_IMAGE,
      this.createFormData(
        { name: 'image', value: image, convert: false },
        { name: 'templateId', value: templateId, convert: true }
      ),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  private createFormData(
    ...args: Array<{ name: string; value: any; convert: boolean }>
  ): FormData {
    const formData = new FormData();

    args.forEach((item) => {
      formData.append(
        item.name,
        item.convert ? JSON.stringify(item.value) : item.value
      );
    });

    return formData;
  }
}
