// @flow

import type { Action } from 'AppTypes';
import {
  GET_FACEBOOK_USER_DATA,
} from './actions';
import { defaultReducers } from '../defaultReducers';

const DEFAULT = defaultReducers.auth;

export default function auth(state = DEFAULT, action: Action = {}) {
  const { type, payload } = action;

  switch (type) {
    case GET_FACEBOOK_USER_DATA: {
      return state;
    }
    default:
      return state;
  }
}
