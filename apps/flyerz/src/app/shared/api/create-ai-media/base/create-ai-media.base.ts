import { Observable } from 'rxjs';
import {
  AiServiceItem,
  AiTemplate,
  AiTemplateDetails,
} from '../models/interfaces';

export abstract class CreateAiMediaApi {
  /**
   * Gets a list of ai videos created by current user
   */
  abstract getUserVideos(): Observable<any>;

  /**
   * Gets a list of ai images created by current user
   * @param offset Start index of data
   * @param limit Max number of items
   */
  abstract getUserImages(
    offset?: number,
    limit?: number
  ): Observable<{ data: Array<AiServiceItem> }>;

  /**
   * Gets a list of avialable templates for creating ai image
   * @param offset Start index of data
   * @param limit Max number of items
   */
  abstract getImageTemplates(
    offset?: number,
    limit?: number
  ): Observable<{ data: AiTemplate[] }>;

  /**
   * Gets template details of provided template id
   * @param templateId Id of template to get details for
   */
  abstract getImageTemplate(
    templateId: number
  ): Observable<{ data: AiTemplateDetails }>;

  /**
   * Creates an ai image based on selected template & file
   * @param image Selected image file (user side)
   * @param templateId Selected template id
   */
  abstract createImage(image: File, templateId: number): Observable<any>;
}
