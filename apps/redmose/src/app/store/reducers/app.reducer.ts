import {Action, createReducer, on} from '@ngrx/store';
import {setAppStaticData} from '../actions/app.action';

export interface State {
  staticData: {
    objectives: any
  }
}

export const initialState = {
  staticData: {
    // todo remove this after the demo
    // pages: [
    //   {
    //     'id': 1,
    //     'page_id': '103174393556002',
    //     'name': 'Math Students',
    //     'is_primary': 1
    //   }
    // ],
    // cites: [
    //   {
    //     'id': 1,
    //     'title': 'cairo'
    //   }
    // ],
    // lookalike: [
    //   {
    //     'id': 21,
    //     'name': 'Ash Store User created segment Audience - DE - 1% similarity - lookalike',
    //     'platform_lookalike_id': '4234234234'
    //   }
    // ],
    // customAudience: [
    //   {
    //     'id': 16,
    //     'name': 'Ash Store All Customers Audience',
    //     'platform_audience_id': 123123
    //   }
    // ],

    gender: [
      {
        title: 'Male/Female',
        id: 'all'
      }, {
        title: 'Male',
        id: 'f'
      }, {
        title: 'Female',
        id: 'm'
      },
    ],
    languages: [
      {
        title: 'Arabic',
        id: 28
      }, {
        title: 'English',
        id: 1001
      }
    ]

  },
}

export const AppReducer = createReducer(
  initialState,
  on(setAppStaticData, (state, action) => ({
    ...state,
    staticData: {
      ...state.staticData,
      [action.payload.key]: action.payload.value
    }
  })))

export function reducer(state: State | any, action: Action) {
  return AppReducer(state, action)
}
