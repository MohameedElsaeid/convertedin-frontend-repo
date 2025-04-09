export interface GoogleBusiness {
  resourceName: string;
  clientCustomer: string;
  level: string;
  timeZone: string;
  manager: boolean;
  currencyCode: string;
  id: string;
  status: string;
  descriptiveName: string;
  isEnabled: boolean;
}
export interface GoogleBusinessPayload {
  resourceName: string;
  clientCustomer: string;
  level: string;
  timeZone: string;
  manager: boolean;
  currencyCode: string;
  adAccountId: string;
  status: 'ENABLED' | 'DISABLED'; // Assuming status might be limited to these values
  refreshToken: string;
}
