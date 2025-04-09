export interface PaymentResponse {
  iFrame: string;
  paymentToken: string;
  netAmount: number;
  agencyPayFeesAmount: number;
  gdrAmount: number;
  riskAmount: number;
  vatAmount: number;
  grossAmount: number;
  invoiceId: string;
}
