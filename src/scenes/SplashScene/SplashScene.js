// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
  AsyncStorage,
} from 'react-native';
import { startApp } from 'AppNavigator';
import { PRIMARY_COLOR } from 'AppColors';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'AppConstants';
import { requestLocationAccess, AlertMessage, promisify } from 'AppUtilities';

const logoImageSource = require('img/images/logo.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: WINDOW_WIDTH / 3,
    height: WINDOW_HEIGHT / 3,
    resizeMode: 'contain',
    marginTop: WINDOW_WIDTH / 3
  },
  loading: {
    position: 'absolute',
    top: (WINDOW_HEIGHT / 3) * 2
  }
});

class SplashScene extends PureComponent {
  constructor(props) {
    super(props);

    this.timer = null;
  }

  componentWillMount() {
    this.timer = setInterval(this.checkRehydration, 200);
  }

  checkRehydration = () => {
    AsyncStorage.getItem('@PROJECTX:REHYDRATED')
      .then((value) => {
        if (value) {
          AsyncStorage.removeItem('@OPENMED:REHYDRATED');
          clearInterval(this.timer);

          setTimeout(() => {
            requestLocationAccess()
              .then(() => startApp())
              .catch(() => {
                // eslint-disable-next-line max-len
                console.log('Location Permission is not granted. You have to enable location service to use app.');
              });
          }, 1000);
        }
      })
      .catch(() => {});
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={logoImageSource}
          style={styles.logo}
        />
        <ActivityIndicator
          style={styles.loading}
          size={'small'}
          color={PRIMARY_COLOR}
        />
      </View>
    );
  }
}

export default SplashScene;
