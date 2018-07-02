// @flow

import { Navigation } from 'react-native-navigation';
import { NativeModules } from 'react-native';
import { WHITE, PRIMARY_COLOR, TABBAR_ITEM_COLOR } from 'AppColors';
import {
  SPLASH_SCENE,
  EXPLORE_SCENE,
  SEARCH_SCENE,
  MESSAGES_SCENE,
  SETTINGS_SCENE
} from './constants';


import registerScreens from './registerScreens';

const { UIManager } = NativeModules;

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

registerScreens();

type Tab = {
  screen: string,
  icon?: number,
  selectedIcon?: number,
  navigatorStyle?: {
    navBarHidden?: boolean
  }
};

const navBarStyle = {
  navigatorStyle: {
    navBarHidden: false,
    tabBarHidden: false,
    statusBarHidden: false,
    statusBarTextColorScheme: 'light',
    screenBackgroundColor: WHITE,
    navBarBackgroundColor: PRIMARY_COLOR,
    navBarTextColor: WHITE,
    navBarTitleTextCentered: true
  },
  iconInsets: {
    top: 0,
    bottom: -3,
    left: 0,
    right: 0
  }
};

const TABS: Array<Tab> = [
  {
    screen: EXPLORE_SCENE,
    label: 'Explore',
    icon: require('img/icons/tab_bar/ic_home.png'),
    selectedIcon: require('img/icons/tab_bar/ic_home_active.png'),
    ...navBarStyle,
    title: 'Explore'
  },
  {
    screen: SEARCH_SCENE,
    label: 'Search',
    icon: require('img/icons/tab_bar/ic_search.png'),
    selectedIcon: require('img/icons/tab_bar/ic_search_active.png'),
    ...navBarStyle,
    title: 'Search'
  },
  {
    screen: MESSAGES_SCENE,
    label: 'Messages',
    icon: require('img/icons/tab_bar/ic_messages.png'),
    selectedIcon: require('img/icons/tab_bar/ic_messages_active.png'),
    ...navBarStyle,
    title: 'Messages'
  },
  {
    screen: SETTINGS_SCENE,
    label: 'Settings',
    icon: require('img/icons/tab_bar/ic_settings.png'),
    selectedIcon: require('img/icons/tab_bar/ic_settings_active.png'),
    ...navBarStyle,
    title: 'Settings'
  }
];

export function startApp() {
  Navigation.startTabBasedApp({
    tabs: TABS,
    tabsStyle: {
      tabBarButtonColor: TABBAR_ITEM_COLOR,
      tabBarSelectedButtonColor: PRIMARY_COLOR,
      tabBarBackgroundColor: WHITE,
      tabBarLabelColor: TABBAR_ITEM_COLOR,
      tabBarSelectedLabelColor: PRIMARY_COLOR,
      tabBarTextFontFamily: 'SFUIText-Regular',
      tabBarHideShadow: false,
      // initialTabIndex: 1,
    },
    appStyle: {
      tabBarButtonColor: TABBAR_ITEM_COLOR,
      tabBarSelectedButtonColor: PRIMARY_COLOR,
      tabBarBackgroundColor: WHITE,
      tabBarLabelColor: TABBAR_ITEM_COLOR,
      tabBarSelectedLabelColor: PRIMARY_COLOR,
      tabBarTextFontFamily: 'SFUIText-Regular',
      tabBarHideShadow: false,
      forceTitlesDisplay: true,
      // initialTabIndex: 1,
    },
    animationType: 'fade',
    portraitOnlyMode: true
  });
}

export function startSplashScene() {
  Navigation.startSingleScreenApp({
    screen: {
      screen: SPLASH_SCENE,
      navigatorStyle: {
        navBarHidden: true,
        statusBarHidden: true,
        statusBarTextColorScheme: 'dark',
      },
      portraitOnlyMode: true
    },
    appStyle: {
      orientation: 'portrait'
    },
    animationType: 'fade',
  });
}
