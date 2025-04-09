import { Pagination } from '@redmose/shared/models/interfaces';
import { TemplateItem } from './template-item.interface';

export interface FlowTemplates extends Pagination {
  data: Array<TemplateItem>;
}
