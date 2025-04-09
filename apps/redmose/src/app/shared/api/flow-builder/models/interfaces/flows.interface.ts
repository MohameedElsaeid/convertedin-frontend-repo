import { Pagination } from '@redmose/shared/models/interfaces';
import { Workflow } from './workflow';
import { FlowsListingItem } from './flows-listing-item';

export interface Flows extends Pagination {
  data: Array<FlowsListingItem>;
}
