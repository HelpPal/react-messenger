// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const GET_FACEBOOK_USER_DATA = 'auth/GET_FACEBOOK_USER_DATA';

/**
 * Action Creators
 */
export const authActionCreators = {
  getFacebookUserData: createPromiseAction(GET_FACEBOOK_USER_DATA),
};
