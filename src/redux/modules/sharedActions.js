// @flow

import { createAction } from 'redux-actions';
import { connect } from 'react-redux';

export const LOGOUT = 'shared/LOGOUT';

export const sharedActionCreators = {
  logout: createAction(LOGOUT),
};

const mapDispatchToProps = {
  clearReduxStore: sharedActionCreators.logout,
};

export function connectSharedAction() {
  return connect(
    null,
    mapDispatchToProps
  );
}
