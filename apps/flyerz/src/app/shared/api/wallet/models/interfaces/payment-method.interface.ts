export interface PaymentMethod {
  id: number;
  name: string;
  code: number;
  is_link: boolean;
  status: {
    id: number;
    name: string;
  };
  logo: string;
  identifier: {
    id: number;
    name: string;
  };
}
