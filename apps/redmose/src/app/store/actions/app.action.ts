import {createAction, props} from '@ngrx/store';


export enum AppActionTypes {
  SET_STATIC_DATA = '[Create Campaign] Set Static Data'
}


export const setAppStaticData = createAction(
  AppActionTypes.SET_STATIC_DATA,
  props<{
    payload: {
      key: string,
      value: any
    }
  }>()
)
