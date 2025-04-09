import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../models/auth-state.interface';
import { StoreKeys } from '@pinads/store/store-keys.enum';

// Auth feature selector
const selectAuth = createFeatureSelector<AuthState>(StoreKeys.AUTH);

export const selectAllAuth = createSelector(selectAuth, (state) => state);
export const selectEmail=createSelector(selectAuth,(state)=>state.email)
