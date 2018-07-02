import { NavData } from 'AppConnectors';
import { TAB_MAP } from 'AppConstants';
import { emitter } from 'AppUtilities';
import { isNil } from 'lodash';

export function handleNavigationEvent({ event, screenName, reactId, isRootOfTab }) {
  const screen = {
    name: screenName,
    reactId,
    isRootOfTab,
  };
  if (isNil(screenName)) {
    return;
  }
  switch (event.id) {
    case 'willDisappear':
      emitter.emit(`${screenName}:willDisappear`, { event, screen });
      return;
    case 'willAppear':
      emitter.emit('willAppear');
      emitter.emit(`${screenName}:willAppear`, { event, screen });
      return;
    case 'didAppear':
      emitter.emit(`${screenName}:didAppear`, { event, screen });
      NavData.setCurrentScreen(screenName);
      return;
    case 'didDisappear':
      emitter.emit(`${screenName}:didDisappear`, { event, screen });
      return;
    case 'bottomTabSelected':
      NavData.setForcedTab(null);
      NavData.setCurrentTab(TAB_MAP[event.selectedTabIndex]);
      return;
    case 'bottomTabReselected':
      emitter.emit('BottomNavReselect', {
        ...screen,
        reselectedTab: NavData.getCurrentTab(),
      });
      return;
    case 'backPress':
    case 'back':
      emitter.emit(`routeBack:${screenName}`);
      return;
    default:
      return;
  }
}
