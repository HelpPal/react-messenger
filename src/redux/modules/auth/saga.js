// @flow

import { ResetApiService } from 'AppServices';
import {
  put,
  call,
  fork,
  all,
  take,
} from 'redux-saga/effects';

import {
  authActionCreators,
  GET_FACEBOOK_USER_DATA,
} from './actions';


export function* asyncGetFacebookUserData({ payload, resolve, reject }) {
  const { accessToken } = payload;

  // eslint-disable-next-line max-len
  const facebookGraphApi = `https://graph.facebook.com/v2.11/me?access_token=${accessToken}&fields=id,name,email,picture{url}`;

  try {
    const response = yield call(
      ResetApiService,
      {
        api: facebookGraphApi,
        method: 'GET',
        params: null,
        third_party: true
      }
    );

    console.log('response = ', response);
    if (response.result === 'ok') {
      resolve(response.data);
    } else {
      reject(response.data);
    }
  } catch (e) {
    reject(e);
  }
}

export function* watchGetFacebookUserData() {
  while (true) {
    const action: Action = yield take(GET_FACEBOOK_USER_DATA);
    yield* asyncGetFacebookUserData(action);
  }
}

export default function* (): Iterable {
  yield all([
    fork(watchGetFacebookUserData),
  ]);
}
