import { MenuItem } from './models';

export const menuItems: Array<MenuItem> = [
  // General routes section
  {
    title: 'General',
    routes: [
      {
        icon: 'app-assets/icons/sidemenu/home-line.svg',
        label: 'Home',
        route: '/dashboard/home',
        trackingEvent: 'home click',
        routes: [],
        subRoutes: [],
        id: 'home',
      },
      // People
      {
        label: 'People',
        icon: 'app-assets/icons/sidemenu/users-01.svg',
        trackingEvent: 'people click',
        id: 'people-tab',
        routes: [
          {
            label: 'Overview',
            route: '/dashboard/customers/overview',
            id: 'people-overview',
          },
          {
            label: 'All Customers',
            route: '/dashboards/people/all-customers',
            id: 'people-all-customers',
          },
          {
            label: 'Segments',
            route: '/dashboard/segments',
            id: 'people-segments',
          },
          {
            label: 'Audiences',
            route: '/dashboard/audiences',
            id: 'people-audiences',
          },
          {
            label: 'Create Segment',
            route: '/dashboard/segments/build',
            id: 'people-create-segment',
          },
        ],
        subRoutes: [],
      },
    ],
  },

  // Campaigns routes section
  {
    title: 'Campaigns',
    routes: [
      // Social media
      {
        label: 'Social Media',
        trackingEvent: 'social media click',
        icon: 'app-assets/icons/sidemenu/phone-01.svg',
        id: 'social-media-tab',
        routes: [
          {
            label: 'Overview',
            route: '/dashboard/social-ads/overall',
            id: 'social-media-overview',
          },
          {
            label: 'Create Campaign',
            route: '/dashboard/social-ads/create/overall',
            checkForAdSpendLimit: true,
            id: 'social-media-create-campaign',
          },
          {
            label: 'Facebook Campaigns',
            route: '/dashboard/social-ads/facebook',
            accessIdentifier: 'facebook',
            checkForAdSpendLimit: true,
            id: 'social-media-facebook',
          },
          {
            label: 'Snapchat Campaigns',
            route: '/dashboard/social-ads/snapchat',
            accessIdentifier: 'snapchat',
            checkForAdSpendLimit: true,
            id: 'social-media-snapchat',
          },
          {
            label: 'TikTok Campaigns',
            route: '/dashboard/social-ads/tiktok',
            accessIdentifier: 'tiktok',
            checkForAdSpendLimit: true,
            id: 'social-media-tikTok',
          },
          {
            label: 'Linkedin Campaigns',
            route: '/dashboard/social-ads/linkedin',
            accessIdentifier: 'linkedin',
            checkForAdSpendLimit: true,
            id: 'social-media-linkedin',
          },
          {
            label: 'Advanced Mode',
            route: '/dashboards/campaigns/create',
            accessIdentifier: 'advanced-mode',
            showForTestUsers: true,
            checkForAdSpendLimit: true,
            id: 'social-media-advanced',
          },
        ],
        subRoutes: [],
      },

      // Direct messaging
      {
        label: 'Direct Messaging',
        icon: 'app-assets/icons/sidemenu/message-text-square-01.svg',
        routes: [],
        trackingEvent: 'direct messaging click',
        id: 'direct-messaging-tab',
        subRoutes: [
          // Email
          {
            label: 'Email',
            accessIdentifier: 'email',
            trackingEvent: 'Email click',
            id: 'direct-messaging-email',
            routes: [
              // {
              //   label: 'Email Overview',
              //   route: '/dashboard/campaigns/email',
              // },
              {
                label: 'Create Campaign',
                route: '/dashboard/campaigns/email/one-time/insights',
                checkForEmailConfig: true,
                id: 'email-create-campaign',
                // checkForAdSpendLimit: true,
              },
              // {
              //   label: 'One-Time Campaigns',
              //   route: '/dashboard/campaigns/email/one-time/insights',
              // },
              // {
              //   label: 'Automation Campaigns',
              //   route: '/dashboard/campaigns/email/automation/insights',
              // },
              {
                label: 'Email Validated List',
                route: '/dashboard/campaigns/email/blacklist',
                id: 'email-validated-list',
              },
              // {
              //   label: 'Flow Builder',
              //   route: '/dashboards/flow-builder',
              //   soon: true,
              // },
            ],
            subRoutes: [],
          },
          // SMS
          {
            label: 'SMS',
            accessIdentifier: 'sms',
            route: '/dashboard/campaigns/sms/one-time/insights',
            checkForSmsConfig: true,
            id: 'direct-messaging-sms',
            routes: [],
            trackingEvent: 'SMS click',
            // routes: [
            //   {
            //     label: 'SMS Overview',
            //     route: '/dashboard/campaigns/sms/insights',
            //   },
            //   {
            //     label: 'Create Campaign',
            //     route: '/dashboard/campaigns/sms/types',
            //   },
            //   {
            //     label: 'One-Time Campaigns',
            //     route: '/dashboard/campaigns/sms/one-time-campaign/insights',
            //   },
            //   {
            //     label: 'Automation Campaigns',
            //     route: '/dashboard/campaigns/sms/automation-campaign/insights',
            //   },
            //   {
            //     label: 'Flow Builder',
            //     route: '/dashboards/flow-builder',
            //     new: true,
            //     isRoute: true,
            //   },
            // ],
            subRoutes: [],
          },
          // Push notifications
          {
            label: 'Push Notification',
            route: '/dashboard/push-notification/one-time/insights',
            accessIdentifier: 'push-notification',
            trackingEvent: 'Push notifications click',
            id: 'direct-messaging-push-notification',
            checkForPushConfig: true,
            routes: [
              // {
              //   label: 'Push Notification Overview',
              //   route: '/dashboard/push-notification/overall',
              // },
              // {
              //   label: 'Create Campaign',
              //   route: '/dashboard/push-notification/create-campaign',
              // },
              // {
              //   label: 'One-Time Campaigns',
              //   route: '/dashboard/push-notification/one-time/insights',
              // },
              // {
              //   label: 'Automation Campaigns',
              //   route: '/dashboard/push-notification/automation/insights',
              // },
              // {
              //   label: 'Flow Builder',
              //   route: '/dashboards/flow-builder',
              //   soon: true,
              // },
            ],
            subRoutes: [],
          },
          // Whatsapp
          {
            label: 'WhatsApp',
            accessIdentifier: 'whatsapp',
            id: 'direct-messaging-whatsapp',
            routes: [
              {
                label: 'WhatsApp Overview',
                route:
                  '/dashboard/campaigns/whatsapp/one-time-campaign/insights',
                id: 'whatsapp-overview',
              },
              // {
              //   label: 'WhatsApp Signup',
              //   route:
              //     '/dashboard/campaigns/whatsapp/one-time-campaign/onboarding',
              //   id: 'whatsapp-signup',
              // },
            ],
            subRoutes: [],
          },
          {
            label: 'Automation',
            route: '/dashboards/flow-builder',
            routes: [],
            subRoutes: [],
            trackingEvent: 'automation click',
            id: 'direct-messaging-automations',
            // new: true,
          },
        ],
      },
      // Universal campaign
      {
        label: 'Universal Campaign',
        icon: 'app-assets/icons/sidemenu/globe-slated-02.svg',
        route: '/dashboard/universal/campaign/create',
        showForTestUsers: true,
        routes: [],
        id: 'universal-campaign',
        subRoutes: [],
      },
      // Display campaigns
      {
        label: 'Display Campaigns',
        icon: 'app-assets/icons/sidemenu/laptop-02.svg',
        id: 'display-campaigns-tab',
        routes: [
          {
            label: 'Criteo Campaigns',
            route: '/dashboard/display-ads/criteo',
            accessIdentifier: 'criteo',
            checkForAdSpendLimit: true,
            id: 'display-campaigns-criteo',
          },
          {
            label: 'Amazon DSP Campaigns',
            route: '/dashboard/display-ads/amazon-dsp',
            accessIdentifier: 'amazon-dsp',
            checkForAdSpendLimit: true,
            id: 'display-campaigns-amazon-dsp',
          },
          {
            label: 'Adroll Campaigns',
            route: '/dashboard/display-ads/adroll',
            accessIdentifier: 'adroll',
            checkForAdSpendLimit: true,
            id: 'display-campaigns-adroll',
          },
          {
            label: 'Quora Campaigns',
            route: '/dashboard/display-ads/quora',
            accessIdentifier: 'quora',
            checkForAdSpendLimit: true,
            id: 'display-campaigns-quora',
          },
        ],
        subRoutes: [],
      },
      // Search engine
      {
        label: 'Search Engine',
        icon: 'app-assets/icons/sidemenu/search-lg.svg',
        id: 'search-engine-tab',
        routes: [
          {
            label: 'Google Dynamic Search',
            route: '/dashboard/search-ads/google/search-dynamic',
            accessIdentifier: 'google-search-dynamic',
            checkForAdSpendLimit: true,
            id: 'search-engine-google-dynamic',
          },
          {
            label: 'Google Performance Max',
            route: '/dashboard/search-ads/google/performance-max',
            accessIdentifier: 'google-performance-max',
            checkForAdSpendLimit: true,
            id: 'search-engine-google-performance',
          },
          {
            label: 'Google Standard Shopping',
            route: '/dashboard/search-ads/google/standard-shopping',
            accessIdentifier: 'google-standard-shopping',
            checkForAdSpendLimit: true,
            id: 'search-engine-google-shopping',
          },
          {
            label: 'Google Static Search',
            route: '/dashboard/search-ads/google/static-search',
            accessIdentifier: 'google-static-search',
            checkForAdSpendLimit: true,
            id: 'search-engine-google-static',
          },
        ],
        subRoutes: [],
      },
    ],
  },

  // Tools routes section
  {
    title: 'Tools',
    routes: [
      {
        label: 'Design Studio',
        accessIdentifier: 'videos',
        icon: 'app-assets/icons/sidemenu/brush-01.svg',
        id: 'design-studio-tab',
        routes: [
          {
            label: 'Video Creator',
            route: '/dashboard/video-creation/templates',
            id: 'design-studio-video-creator',
          },
          {
            label: 'My Videos',
            route: '/dashboard/video-creation/my-video',
            id: 'design-studio-my-videos',
          },
        ],
        subRoutes: [],
      },
      {
        label: 'Resources & Tools',
        icon: 'app-assets/icons/sidemenu/pen-tool-02.svg',
        routes: [],
        id: 'resources-tools-tab',
        subRoutes: [
          {
            label: 'Pop-up Forms',
            id: 'popup-forms',
            routes: [
              {
                label: 'Overview',
                route: '/dashboard/forms',
                id: 'popup-forms-overview',
              },
              {
                label: 'Create Form',
                route: '/dashboard/forms/templates',
                id: 'popup-forms-create',
              },
            ],
            subRoutes: [],
          },
          {
            label: 'Catalog Intelligence',
            route: '/dashboard/catalogs',
            routes: [],
            subRoutes: [],
            id: 'catalog-intelligence',
          },
        ],
      },
      {
        icon: 'app-assets/icons/sidemenu/book-open-01.svg',
        label: 'Academy',
        route: 'https://academy.converted.in/',
        id: 'academy',
        routes: [],
        subRoutes: [],
      },
    ],
  },

  // {
  //   label: 'Upcoming',
  //   routes: [
  //     {
  //       label: 'Academy',
  //       route: 'm',
  //       soon: true,
  //       icon: 'app-assets/icons/sidemenu/book-open-01.svg',
  //       subRoutes: [],
  //       routes: [],
  //     },
  //   ],
  // },
];

export const moreMenuItems: Array<MenuItem> = [
  // General routes section
  {
    title: 'More',
    routes: [
      {
        label: 'Settings',
        icon: 'app-assets/icons/sidemenu/settings-01.svg',
        id: 'settings',
        routes: [
          {
            label: 'Configurations',
            route: '/dashboard/configuration',
            id: 'settings-configurations',
          },
          {
            label: 'Connected Stores',
            route: '/dashboard/data-sources/stores',
            id: 'settings-connected-stores',
          },
          {
            label: 'Social Connections',
            route: '/dashboard/data-sources/social',
            id: 'settings-social-connections',
          },
          {
            label: 'Display Connections',
            route: '/dashboard/data-sources/display',
            id: 'settings-display-connections',
          },
        ],
        subRoutes: [],
      },
      {
        icon: 'app-assets/icons/sidemenu/help-circle.svg',
        label: 'Help Center',
        route: 'https://help.converted.in/en/knowledge',
        routes: [],
        subRoutes: [],
        id: 'help-center',
      },
    ],
  },
];
