export const routes: { img: string; title: string; route: string }[] = [
  // Home
  {
    img: 'assets/icons/dashboard/common/home.svg',
    title: 'dashboard.sidebar.home',
    route: '/my-dashboard',
  },
  // Apps
  // {
  //   img: 'assets/icons/dashboard/common/apps.svg',
  //   title: 'dashboard.sidebar.apps',
  //   route: '/my-dashboard/apps',
  // },
  // Studio
  {
    img: 'assets/icons/dashboard/common/studio.svg',
    // route: '/my-dashboard/studio',
    route: '/my-dashboard/studio',
    title: 'dashboard.sidebar.studio',
  },
  // Wallet
  {
    img: 'assets/icons/dashboard/common/wallet-minus.svg',
    title: 'dashboard.sidebar.wallet',
    route: '/my-dashboard/wallet',
  },
  // Settings
  {
    img: 'assets/icons/dashboard/common/settings.svg',
    title: 'dashboard.sidebar.settings',
    route: '/my-dashboard/settings',
  },
  // Notifications
  // {
  //   img: 'assets/icons/dashboard/common/notification.svg',
  //   title: 'dashboard.sidebar.notifications',
  //   route: '/my-dashboard/notification',
  // },
  // Support
  {
    img: 'assets/icons/dashboard/common/support.svg',
    title: 'dashboard.sidebar.support',
    route: '',
  },
];
