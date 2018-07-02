// @flow

import type { Action } from 'AppTypes';
import {
  SEARCH_NEAR_BY_SUCCESS,
} from './actions';
import { defaultReducers } from '../defaultReducers';

const DEFAULT = defaultReducers.search;

export default function search(state = DEFAULT, action: Action = {}) {
  const { type, payload } = action;

  switch (type) {
    case SEARCH_NEAR_BY_SUCCESS: {
      return state;
    }
    default:
      return state;
  }
}
