import { ApiConstants } from '@flyerz/shared/constants';

export class CreateAiMediaEndpoints {
  // Get image creation templates endpoint
  static readonly GET_IMAGE_TEMPLATES =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/images/templates';
  // Get template details endpoint
  static readonly GET_IMAGE_TEMPLATE = (templateId: number) =>
    ApiConstants.INITIAL +
    ApiConstants.VERSION(2) +
    '/images/templates/' +
    templateId;
  // Create ai image endpoint
  static readonly CREATE_IMAGE =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/images/create';
  // Get user created ai images endpoint
  static readonly GET_USER_IMAGES =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/images/user';
  // Get user created ai videos
  static readonly GET_USER_VIDEOS =
    ApiConstants.INITIAL + ApiConstants.VERSION(2) + '/videos/user';
}
