// @flow

import { Dimensions, StatusBar, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

export const WINDOW_WIDTH = width;
export const WINDOW_HEIGHT = height;
export const IS_IPHONE_X = WINDOW_HEIGHT === 812;
export const STATUSBAR_HEIGHT = isIOS
  ? IS_IPHONE_X
    ? 35
    : 20
  : StatusBar.currentHeight;
export const ROOT_PADDING_TOP = IS_IPHONE_X ? 30 : 0;

export const NAVBAR_HEIGHT = WINDOW_HEIGHT * 0.066;
export const NAV_TAB_BAR_HEIGHT = isIOS ? 49 : 56;
export const TAB_MAP = ['ExploreScene', 'SearchScene', 'MessagesScene', 'SettingsScene'];

export const SYSTEM_MESSAGES = {
  FROM_REQUEST: {
    title: 'Something went wrong',
    description: 'We are currently experiencing technical difficulties, please try again later.',
  },
  NOT_SUPPORTED_LINK: {
    title: 'Not Supported',
    description: 'Current link is not supported'
  }
};

export const KEYBOARD_EVENTS = {
  DID_SHOW: 'keyboardDidShow',
  WILL_SHOW: 'keyboardWillShow',
  WILL_HIDE: 'keyboardWillHide',
  DID_HIDE: 'keyboardDidHide',
  WILL_CHANGE_FRAME: 'keyboardWillChangeFrame',
  DID_CHANGE_FRAME: 'keyboardDidChangeFrame'
};

export const DEFAULT_COORDS = { latitude: 38.138147150712115, longitude: -95.7154973139652 };
