import { SocialChannel } from '../enums';

export interface SocialMediaChannel {
  id: SocialChannel;
  name: string;
  isActive: boolean | number;
  isConnected: boolean;
  canConnectInstagram: boolean;
  connectedAccount?: {
    isTokenValid?: boolean;
    isAssigned?: boolean;
    canConnectInstagramAccount?: boolean;
    category: {
      id: number;
      name: string;
    };
    page: {
      id: string;
      image: string;
      name: string;
    };
  };
  type?: {
    id: number;
    name: string;
  };
}
