//  @flow

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { compact } from 'lodash';

import { composeWithDevTools } from 'remote-redux-devtools';
import createSagaMiddleware from 'redux-saga';
import { AsyncStorage } from 'react-native';
import rootReducer from './reducers';
import sagas from './sagas';
import createLogger from 'redux-logger';

// change context types in ReduxWrapper.js
export default function initializeStore(context: Object) {
  const { emitter } = context;
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = compact([
    thunk.withExtraArgument({ emitter }),
    sagaMiddleware,
    __DEV__ ? createLogger() : null,
  ]);

  let debuggWrapper = (data) => data;
  if (__DEV__) {
    debuggWrapper = composeWithDevTools({ realtime: true, port: 8000 });
  }

  const store = createStore(
    rootReducer,
    {},
    debuggWrapper(compose(applyMiddleware(...middlewares), autoRehydrate()))
  );

  persistStore(
    store,
    {
      blacklist: compact([
        'search',
        'provider'
      ]),
      storage: AsyncStorage
    },
    () => {
      AsyncStorage.setItem('@PROJECTX:REHYDRATED', 'REHYDRATED');
    }
  );

  sagaMiddleware.run(sagas);

  return store;
}
