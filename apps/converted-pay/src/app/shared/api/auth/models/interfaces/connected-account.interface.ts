import { GoogleDetails } from "@converted-pay/shared/api/social-accounts";

export interface ConnectedAccount {
  platformId: number;
  connectionId: number;
  name: string;
  businessId: string;
  businessName: string;
  createdAt: string;
  id:string;
  status:string;
  details: { google: GoogleDetails };
}
