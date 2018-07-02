// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const SEARCH_NEAR_BY = 'search/SEARCH_NEAR_BY';
export const SEARCH_NEAR_BY_SUCCESS = 'search/SEARCH_NEAR_BY_SUCCESS';

/**
 * Action Creators
 */
export const searchActionCreators = {
  searchNearBy: createAction(SEARCH_NEAR_BY),
  searchNearBySuccess: createAction(SEARCH_NEAR_BY_SUCCESS),
};
