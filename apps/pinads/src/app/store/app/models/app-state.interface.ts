import { User } from '@pinads/shared/api/auth';

export interface AppState {
  userData: User | null;
  notificationCount: number;
}
