import { CreateAdChannelType } from '../enums';

export interface CreateAdChannel {
  id: number;
  name: string;
  isActive: number;
  isConnected: boolean;
  canConnectInstagram: boolean;
  connectedAccount?: {
    isTokenValid: boolean;
    isAssigned: boolean;
    canConnectInstagramAccount: boolean;
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
  type: {
    id: CreateAdChannelType;
    name: string;
  };
}
