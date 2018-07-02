//  @flow
import type { Navigator } from 'AppTypes';
import { Platform } from 'react-native';
import { emitter, Logger } from 'AppUtilities';
import { RESET_ROUTE_STACK, TAB_MAP } from 'AppConstants';
import { debounce, isBoolean } from 'lodash';
import { startSplashScene } from './Navigator';
import { NavData } from 'AppConnectors';

type NavigationEvent<T> = {
  id: T,
  unselectedTabIndex?: number
}

type SetNavigationEvent<T> = (cb: (e: NavigationEvent<T>) => any) => any;

type MapParams = {
  setBadge: (key: string, value: number, tabIndex: number) => void,
  onBack: (animated: ?boolean) => void,
  routeBack: (...data: any) => void,
  replaceCurrentScene: (sceneName: string, passProps?: Object, params?: Object) => void,
  replaceCurrentSceneProps: (passProps: ?Object, index: number) => void,
  routeScene: (sceneName: string, passProps?: Object, params?: Object) => void,
  resetRouteStack: (index: number, passProps?: Object) => void,
  resetToRouteStack: () => void,
  resetTo: (sceneName: string, passProps?: Object, params?: Object) => void,
  jumpTo: (tabIndex: number) => void,
  popToRoot: (params?: Object) => void,
  showModal: (sceneName: string, passProps?: Object, params?: Object) => void,
  dismissModal: (params?: Object) => void,
  screenWillAppear: SetNavigationEvent<'willAppear'>,
  screenDidAppear: SetNavigationEvent<'didAppear'>,
  screenWillDisappear: SetNavigationEvent<'willDisappear'>,
  screenDidDisappear: SetNavigationEvent<'didDisappear'>,
};

const logger = new Logger('mapNavigationToProps');
const BACK_ICON = require('img/icons/arrow_left.png');

const ACTION_DELAY = 200;
const IGNORE_DEBOUNCE_LIST = [
  'setBadge',
  'popToRoot',
  'resetTo',
  'screenWillAppear',
  'screenDidAppear',
  'screenWillDisappear',
  'screenDidDisappear'
];

function getSceneNavigatorStyle(scene: string) {
  const navigatorParams = {};
  switch (scene) {
    default:
      navigatorParams.statusBarTextColorScheme = 'dark';
      break;
  }
  return navigatorParams;
}

function debounceMethods(passActions: MapParams, ignoreList: string[], DELAY: number): MapParams {
  const actions = { ...passActions };
  Object.keys(actions)
    .forEach((fnName) => {
      if (ignoreList.includes(fnName)) {
        return;
      }
      actions[fnName] = debounce(actions[fnName], DELAY);
    });

  return actions;
}

function genResetStackEvn(index: number): string {
  return `${RESET_ROUTE_STACK}:${index}`;
}

export default function (navigation: Navigator): MapParams {
  const passActions = {
    onBack: (shouldAnimate) => {
      // this function is sometimes called with an event object as the first argument instead of the
      // shouldAnimate boolean so a guard is in place to evaluate to true if anything else besides
      // a boolean is passed in
      let animated = true;
      if (isBoolean(shouldAnimate)) {
        animated = shouldAnimate;
      }
      navigation.pop({
        animated
      });
    },
    routeBack: () => {
      navigation.pop();
    },
    resetApp: () => {
      NavData.setLogout();
      startSplashScene();
    },
    replaceCurrentSceneProps: () => {},
    resetRouteStack: (tabIndex: number, passProps: ?Object) => {
      if (passProps && passProps.logout) {
        NavData.setLogout();
        startSplashScene();
        return;
      }
      // this may be a result of another navigation function being called immediately after
      navigation.popToRoot();
      navigation.switchToTab({ tabIndex });
      emitter.emit(genResetStackEvn(tabIndex), passProps);
      logger.info('resetStack', tabIndex, passProps);
    },
    resetToRouteStack: () => {},
    switchTab: (tabIndex: number, forced: boolean = false) => {
      if (forced) {
        NavData.setForcedTab(NavData.getCurrentTab());
      }
      NavData.setCurrentTab(TAB_MAP[tabIndex]);
      navigation.switchToTab({ tabIndex });
    },
    jumpTo: (tabIndex: number) => {
      // this may be a result of another navigation function being called immediately after
      navigation.popToRoot({ animated: false });
      NavData.setForcedTab(NavData.getCurrentTab());
      NavData.setCurrentTab(TAB_MAP[tabIndex]);
      navigation.switchToTab({ tabIndex });
    },
    showLightBox: (screenName: string, passProps: Object, style?: Object): void => {
      navigation.showLightBox({
        screen: `app.${screenName}`,
        passProps,
        style
      });
    },
    dismissLightBox: (params: Object): void => {
      navigation.dismissLightBox(params);
    },
    replaceCurrentScene: (scene: string, passProps: ?Object, params: Object = {}) => {
      navigation.replace({
        screen: `app.${scene}`,
        navigatorStyle: {
          navBarHidden: true,
          screenBackgroundColor: 'white',
          navBarTitleTextCentered: true, // Android only
          disabledBackGesture: false,
          orientation: 'portrait',
          enabledBackGestureFullScreen: true,
          ...getSceneNavigatorStyle(scene),
          ...params.navigatorStyle
        },
        navigatorButtons: {
          leftButtons: [{
            icon: BACK_ICON,
            id: 'back'
          }],
          animated: true,
        },
        backButtonHidden: params.backButtonHidden,
        backButtonTitle: params.backButtonTitle,
        title: params.title,
        titleImage: params.titleImage,
        animated: params.animated,
        overrideBackPress: params.overrideBackPress,
        passProps
      });
    },
    routeScene: (scene: string, passProps: ?Object, params: Object = {}) => {
      navigation.push({
        screen: `app.${scene}`,
        navigatorStyle: {
          navBarHidden: true,
          screenBackgroundColor: 'white',
          navBarTitleTextCentered: true, // Android only
          disabledBackGesture: false,
          orientation: 'portrait',
          enabledBackGestureFullScreen: true,
          ...getSceneNavigatorStyle(scene),
          ...params.navigatorStyle
        },
        navigatorButtons: {
          leftButtons: [{
            icon: BACK_ICON,
            id: 'back'
          }],
          animated: true,
        },
        backButtonHidden: params.backButtonHidden,
        backButtonTitle: params.backButtonTitle,
        title: params.title,
        titleImage: params.titleImage,
        animated: params.animated,
        overrideBackPress: params.overrideBackPress,
        passProps
      });
    },
    setBadge: (key: string, value: number, tabIndex: number) => {
      const mapNamesToKeys = {
        notifications: 'badge',
        messages: 'badge'
      };
      //  need to figure out how to set 2 badges
      navigation.setTabBadge({
        tabIndex,
        [mapNamesToKeys[key]]: value
      });
    },
    popToRoot: (params: ?Object) => {
      navigation.popToRoot(params);
    },
    resetTo: (scene: string, passProps: ?Object, params: Object = {}) => {
      // photo button (ie: the justHive button) when in the photo edit scene
      // it has the effect of just reseting to a new camera scene and any back press
      // pushes the photo edit scene onto the new camera stack
      let isCoreTab;
      // currently no other part of the app uses this function but in the future the following code
      // allows other screens to use the function
      // currently the camera container cannot use this for anything but replacing
      if (scene === 'CameraScene') {
        isCoreTab = true;
      }
      navigation.resetTo({
        screen: `app.${scene}`,
        title: params.title,
        animated: params.animated,
        navigatorStyle: {
          navBarHidden: true,
          ...params.navigatorStyle,
        },
        navigatorButtons: {
          ...Platform.select({
            android: {
              leftButtons: [{
                icon: BACK_ICON,
                id: 'back'
              }],
              animated: true,
            }
          }),
          ...params.navigatorButtons,
        },
        overrideBackPress: params.overrideBackPress,
        passProps: {
          ...passProps,
          isCoreTab,
        }
      });
    },
    showModal: (scene: string, passProps: ?Object, params: Object = {}) => {
      navigation.showModal({
        screen: `app.${scene}`,
        title: params.title,
        navigatorStyle: {
          navBarHidden: true,
          orientation: 'portrait',
          ...params.navigatorStyle,
        },
        animationType: params.animationType,
        overrideBackPress: params.overrideBackPress,
        passProps,
      });
    },
    dismissModal: (params: Object = {}) => {
      navigation.dismissModal({
        animationType: params.animationType,
      });
    },
  };

  return debounceMethods(passActions, IGNORE_DEBOUNCE_LIST, ACTION_DELAY);
}
