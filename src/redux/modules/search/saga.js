// @flow

import {
  put,
  call,
  fork,
  all,
  select,
  take,
  takeLatest
} from 'redux-saga/effects';

import {
  searchActionCreators,
  SEARCH_NEAR_BY,
} from './actions';

import {
  OpenMed_Service
} from 'AppServices';
import qs from 'qs';

export function* asyncSearchNearBy({ payload }) {
  const { query } = payload;
  const { name, location, radius, key } = query;

  try {
    let response = yield call(OpenMed_Service,
      { api: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${name}&types=establishment&location=${location}&radius=${radius}&key=${key}`,
        method: 'GET',
        params: null,
        third_party: true
      });

    if (response.result === 'ok') {
      yield put(searchActionCreators.searchNearBySuccess(response.data));
    }
  } catch (e) {
    console.log(e);
  }
}

export function* watchSearchNearBy() {
  yield takeLatest(SEARCH_NEAR_BY, asyncSearchNearBy);
}

export default function* (): Iterable {
  yield all([
    fork(watchSearchNearBy),
  ]);
}
