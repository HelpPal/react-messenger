// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';
import { CachedImageView, SocialButton } from 'AppComponents';
import { PRIMARY_COLOR, BLACK } from 'AppColors';
import { WINDOW_WIDTH } from 'AppConstants';
import { promisify, AlertMessage } from 'AppUtilities';
import { SFBold } from 'AppFonts';
import { connectAuth } from 'AppRedux';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  profile: {
    alignItems: 'center',
    alignSelf: 'center'
  },
  avatar: {
    width: 80,
    height: 80,
    marginTop: 30
  },
  name: {
    fontSize: 14,
  },
  socialButton: {
    width: WINDOW_WIDTH - 42,
    height: 50,
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: PRIMARY_COLOR,
  },
  marginLeftStyle: {
    marginLeft: 10
  },
  facebookButtonText: {
    marginLeft: 10,
    color: BLACK
  }
});

class SettingsContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      facebookUser: {}
    };
  }

  loginWithFacebook = () => {
    const { getFacebookUserData } = this.props;

    LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (result.isCancelled) {
          return Promise.reject('Facebook login cancelled');
        }
        return AccessToken.getCurrentAccessToken();
      })
      .then((data) => {
        if (data.accessToken) {
          return promisify(getFacebookUserData, { facebookToken: data.accessToken });
        }
        return Promise.reject('Cannot read facebook token. Try again.');
      })
      .then(fbUserData => this.setState({ facebookUser: fbUserData }))
      .catch((error) => {
        AlertMessage.fromRequest(error);
      });
  };

  render() {
    const { facebookUser } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <CachedImageView
            style={styles.avatar}
            resizeMode={'cover'}
            borderRadius={30}
            indicator={Progress.Circle}
            indicatorProps={{
              size: 20,
              thickness: 1,
              borderWidth: 0,
              color: PRIMARY_COLOR,
            }}
            source={{ uri: facebookUser.avatarUrl }}
            placeholder={require('img/images/ic_avatar.png')}
            threshold={50}
          />
          <SFBold style={styles.name}>
            {facebookUser.name}
          </SFBold>
        </View>
        <SocialButton
          style={styles.socialButton}
          onPress={this.loginWithFacebook}
          bigIcon={require('img/icons/social/ic_facebook.png')}
          bigIconStyle={styles.marginLeftStyle}
          bigText={'LOGIN WITH FACEBOOK'}
          bigTextStyle={styles.facebookButtonText}
        />
      </View>
    );
  }
}

SettingsContainer.propTypes = {
  routeScene: PropTypes.func.isRequired,
  getFacebookUserData: PropTypes.func.isRequired,
};

export default connectAuth()(SettingsContainer);
