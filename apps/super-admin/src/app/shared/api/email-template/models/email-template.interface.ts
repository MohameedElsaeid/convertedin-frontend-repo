export interface EmailTemplate {
  allowed_items: string;
  description: string | null;
  html_body: string;
  id: number;
  image_url: string;
  is_active: boolean;
  lang: string;
  name: string;
  order: number;
  params: any[];
  product_template: string;
  published: boolean;
  row_template: string;
}

export interface CreateEmailTemplate {
  name: string;
  description: string;
  image_url: string;
  html_body: string;
  row_template: any;
  product_template: any;
  published: number;
  is_active: number;
  lang: string;
  order: number;
}
