export interface UserData {
  user: {
    advertisingId: string;
    appsflyerId: string;
    referenceNo: string;
    identifier: string;
    image: string;
    invitationPromoCode: string;
    firstName: string;
    lastName: string;
    wallet: number;
    email: {
      email: string;
      isVerified: boolean;
      verifiedAt?: any;
    };
    mobileNumber: {
      number: string;
      countryCode: string;
      isVerified: boolean;
      verifiedAt: string;
    };
    country: {
      id: number;
      flag: string;
      key: string;
      name: string;
    };
    currency: {
      id: number;
      name: string;
      symbol: string;
    };
  };
  cashBack: {
    isEnabled: boolean;
    acceptedTerms: boolean;
  };
  hasConnectedAccounts: boolean;
  hasReviewed: boolean;
  apiToken: string;
  waitingConversion: boolean;
  waitingSnapchat: boolean;
  waitingTiktok: boolean;
  waitingGoogle: boolean;
  waitingLeadGeneration: boolean;
  waitingFlyerzStudio: boolean;
  isFacebookConversionAdsEnabled: boolean;
  isFacebookLeadGenerationAdsEnabled: boolean;
  isFlyerzStudioImageVideoEnabled: boolean;
  isSnapchatEnabled: boolean;
  isTiktokEnabled: boolean;
  isGoogleEnabled: boolean;
}
