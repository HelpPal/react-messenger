// @flow

import {
  LOGOUT
} from '../sharedActions';

import { defaultReducers } from '../defaultReducers';

export default function resetReducer(state, action) {
  switch (action.type) {
    case LOGOUT: {
      return {
        ...state,
        ...defaultReducers,
        location: {
          ...defaultReducers.location,
          region: state.location.region
        },
        provider: {
          ...defaultReducers.provider,
          regionProviders: state.provider.regionProviders,
          page: state.provider.page
        }
      };
    }
    default:
      return state;
  }
}
