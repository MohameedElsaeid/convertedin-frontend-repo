import type { UserData } from '@converted-pay/shared/api';

export const routeList: {
  name: string;
  icon: string;
  route: string;
  conditionKey?: keyof UserData;
}[] = [
  {
    name: 'sidebar.home',
    icon: 'assets/icons/sidebar/home-line.svg',
    route: '/dashboard/home',
  },
  {
    name: 'sidebar.accounts',
    icon: 'assets/icons/sidebar/link-01.svg',
    route: '/dashboard/accounts',
  },
  {
    name: 'sidebar.settings',
    icon: 'assets/icons/sidebar/settings-01.svg',
    route: '/dashboard/settings',
  },
  {
    name: 'sidebar.freeCredit',
    icon: 'assets/icons/sidebar/gift.svg',
    route: '/dashboard/referral',
    conditionKey: 'isSenderFreeCreditEnabled',
  },
  {
    name: 'sidebar.faq',
    icon: 'assets/icons/sidebar/faq.svg',
    route: '/dashboard/faq',
  },
];
