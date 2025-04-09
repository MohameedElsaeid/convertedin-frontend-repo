import { AdLead } from './ad-lead.interface';

export interface AdLeads {
  data: { data: Array<AdLead>; next?: string };
}
