export interface SocialMediaPage {
  facebook: {
    pageId: string;
    name: string;
    isPublished: boolean;
    hasWhatsAppBusinessNumber: boolean;
    hasWhatsAppNumber: boolean;
    leadgenTosAccepted: boolean;
    categoryList: Array<SocialMediaCategory>;
    tasks: Array<string>;
    image: string;
  };
}

interface SocialMediaCategory {
  id: string;
  name: string;
}
