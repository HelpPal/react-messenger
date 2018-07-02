//  @flow

type AnimationType =
  | 'slide-down'
  | 'none';

type WithAnimation = {
  animationType?: AnimationType
};

type IsAnimated = {
  animated?: boolean
};

export type NavigationEvent = {
  id: string,
  navigatorID?: string,
  screenInstanceID?: string,
  selectedTabIndex?: number,
  unselectedTabIndex?: number,
  type?: string
};

type NaivgateParams = {
  screen: string,
  title: ?string,
  titleImage: ?number,
  passProps: ?any,
  animated: boolean,
  backButtonTitle: ?string,
  navigatorStyle: ?Object,
  navigatorButtons: ?Object,
  backButtonHidden: ?boolean,
  style: ?Object
};

type ButtonsAction = IsAnimated & {
  leftButtons: Array<*>,
  rightButtons: Array<*>,
};

export type Navigator = {
  navigatorEventHandler: ?any,
  navigatorEventID: string,
  navigatorEventSubscription: ?Function,
  navigatorID: string,
  screenInstanceID: string,
  cleanup: () => void,
  dismissAllModals: () => void,
  dismissContextualMenu: () => void,
  dismissInAppNotification: () => void,
  dismissLightBox: () => void,
  dismissModal: (options: $Shape<WithAnimation>) => void,
  dismissSnackbar: () => void,
  handleDeepLinking: (params: { link: string }) => void,
  onNavigatorEvent: (cb: (e: Object) => void) => void,
  pop: (params?: IsAnimated) => void,
  popToRoot: (params: ?Object) => void,
  push: (params: $Shape<NaivgateParams>) => void,
  resetTo: (params: $Shape<NaivgateParams>) => void,
  setButtons: (params: $Shape<ButtonsAction>) => void,
  setOnNavigatorEvent: (cb: (e: NavigationEvent) => void) => void,
  setStyle: (...data: any) => void,
  setSubTitle: (...data: any) => void,
  setTabBadge: (params: { tabIndex: number, badge: number }) => void,
  setTitle: (params: { title: string }) => void,
  setTitleImage: (params: any) => void,
  showContextualMenu: (...data: any) => void,
  showInAppNotification: (...data: any) => void,
  showLightBox: (params: $Shape<NaivgateParams>) => void,
  showModal: (params: $Shape<NaivgateParams & IsAnimated>) => void,
  showSnackbar: (...data: any) => void,
  switchToTab: (params: { tabIndex?: number }) => void,
  toggleDrawer: (params: { side: 'left' | 'right', to: string } & IsAnimated) => void,
  toggleNavBar: (params: IsAnimated & { to: string }) => void,
  toggleTabs: (params: IsAnimated & { to: string }) => void
};
