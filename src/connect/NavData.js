let currentScreen;
let prevScreen;
let currentTab = 'SearchScene';
let prevTab;
let forcedTab;

const navigators = {};

const NavData = {
  getCurrentTab: () => currentTab,
  getForcedTab: () => forcedTab,
  getCurrentScreen: () => currentScreen,
  getPrevTab: () => prevTab,
  getPrevScreen: () => prevScreen,
  setCurrentScreen: (screen) => {
    prevScreen = currentScreen;
    currentScreen = screen;
  },
  setCurrentTab: (tab) => {
    prevTab = currentTab;
    currentTab = tab;
  },
  setForcedTab: (tab) => {
    forcedTab = tab;
  },
  setNavigator: (rootScreen, navObj) => {
    navigators[rootScreen] = navObj;
  },
  getNavigator: (rootScreen) => navigators[rootScreen]
};

Object.freeze(NavData);
export default NavData;
