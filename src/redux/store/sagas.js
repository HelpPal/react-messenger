// @flow

import { fork, all } from 'redux-saga/effects';
import {
  searchSaga,
  authSaga,
} from '../modules';

type Saga = Iterable<*>;

export default function* rootSaga(): Saga {
  yield all([
    fork(searchSaga),
    fork(authSaga),
  ]);
}
