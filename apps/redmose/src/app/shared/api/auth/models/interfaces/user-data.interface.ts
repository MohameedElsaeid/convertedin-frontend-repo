export interface UserMenu {
  label: string;
  name: string;
  shortName: string[];
  image: string;
  role: string;
  onboardingStatus: string;
  submenu: SubmenuItem[];
}

export interface LanguageMenu {
  label: string;
  submenu: { [language: string]: string }; // Key-value pair for language and URL
}

export interface SubmenuItem {
  label: string;
  url: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  country_code: string | null;
  image: string | null;
  activated: boolean;
  is_fraud: boolean;
  business_type: string;
  marketing_budget: string;
  store_url: string;
  platform: string;
  onboarding: string;
  onboarding_status: string;
  store_connected: null | string;
  test: boolean;
  has_connected_store: boolean;
  created_at: string;
  updated_at: string;
  isStoreEmailConfigCompleted: boolean;
  ad_spend_limit_exceeded: boolean;
  isStorePushConfigCompleted: boolean;
  isStoreSmsConfigCompleted: boolean;
}

export interface UserData {
  navbar: {
    menus: {
      user: UserMenu;
      languages: LanguageMenu;
    };
  };
  user: User;
}
