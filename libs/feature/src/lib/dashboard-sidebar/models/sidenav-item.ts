import { SideNavItemBase } from './sidenav-item-base.interface';

export interface SideNavItem extends SideNavItemBase {
  icon?: string;
  // route?: string;
  // soon?: boolean;
  // isRoute?: boolean;
  // new?: boolean;
  // showForTestUsers?: boolean;
  // identifier?: string;
  routes: Array<SideNavItemBase>;
  subRoutes: Array<SideNavItem>;
}
