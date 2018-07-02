// @flow

import React from 'react';

import { Provider } from 'AppRedux';
import {
  emitter,
  overrideLogs,
  escapeScreenName
} from 'AppUtilities';
import { rootConnector } from 'AppConnectors';
import { withContext } from 'recompose';
import { SEARCH_SCENE } from './constants';

import mapNavigatorToProps from './mapNavigationToProps';

if (!__DEV__) {
  overrideLogs();
}

const rootLevelEnhancer: (fn: () => React.Element<*>) => Function = withContext({
  emitter: React.PropTypes.object
}, () => {
  return {
    emitter,
  };
});

export default function (Component: React.Element<*>, screen: string): Function {
  return function navigationConnector(): Function {
    return function inject(props: Object): React.Element<*> {
      const AppLevelEnhanced = screen === escapeScreenName(SEARCH_SCENE)
        ? rootConnector(Component)
        : Component;

      const EnhancedComponent = rootLevelEnhancer(() => (
        <Provider>
          <AppLevelEnhanced
            {...props}
            {...mapNavigatorToProps(props.navigator)}
          />
        </Provider>
      ));

      return <EnhancedComponent />;
    };
  };
}
