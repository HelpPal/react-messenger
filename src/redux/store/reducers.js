// @flow

import { combineReducers } from 'redux';

import { LOGOUT } from '../modules/sharedActions';

import {
  resetReducer,
  search,
  auth,
} from '../modules';


const appReducer = combineReducers({
  search,
  auth,
});

export default function rootReducer(state, action) {
  let finalState = appReducer(state, action);

  if (action.type === LOGOUT) {
    finalState = resetReducer(finalState, action);
  }

  return finalState;
}
