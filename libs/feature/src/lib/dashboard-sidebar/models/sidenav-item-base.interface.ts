export interface SideNavItemBase {
  label: string;
  route?: string;
  soon?: boolean;
  new?: boolean;
  isRoute?: boolean;
  accessIdentifier?: string;
  showForTestUsers?: boolean;
  checkForAdSpendLimit?: boolean;
  checkForEmailConfig?: boolean;
  trackingEvent?: string;
  id: string;
  checkForPushConfig?: boolean;
  checkForSmsConfig?: boolean;
}
