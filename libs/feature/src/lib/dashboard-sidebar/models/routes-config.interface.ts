import { MenuItem } from './menu-item.interface';

export interface RoutesConfig {
  // baseUrl: string;
  // logo: string;
  routes: Array<MenuItem>;
  moreMenuRoutes?: Array<MenuItem>;
}
