import { SideNavItem } from './sidenav-item';

export interface MenuItem {
  title: string;
  routes: Array<SideNavItem>;
}
