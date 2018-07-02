import Permissions from 'react-native-permissions';
import { Alert, Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';

function messageForMode(mode) {
  switch (mode) {
    case 'photo':
      return 'Photos are currently disabled. Would you like to enable them?';
    case 'microphone':
      return 'Microphone are currently disabled. Would you like to enable them?';
    default:
      return 'Camera is currently disabled. Would you like to enable it?';
  }
}

/**
 * authorized -   user has authorized this permission
 *
 * denied -       user has denied this permission at least once. On iOS this
 *                means that the user will not be prompted again. Android users
 *                can be promted multiple times until they select 'Never ask me again'
 *
 * restricted -   (iOS only) user is not able to grant this permission,
 *                either because it's not supported by the device or because
 *                it has been blocked by parental controls.
 *
 * undetermined - user has not yet been prompted with a permission dialog
 *                or user denied by selecting 'Never ask me again' on android.
 *
**/

export function requestCameraAccess(mode, message = null) {
  return Permissions.check(mode).then(status => {
    // status is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    if (status === 'authorized') {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      Permissions.request(mode)
        .then(response => {
          if (response === 'authorized') {
            return resolve();
          }
          const showAlert =
            (isIOS && status !== 'undetermined' || !isIOS && status !== 'denied') &&
            (isIOS && response === 'denied' || !isIOS && response === 'undetermined');
          if (showAlert) {
            return Alert.alert(`${messageForMode(mode)}`, message, [
              { text: 'Cancel', onPress: () => reject('permission denied') },
              { text: 'Yes', onPress: () => {
                Permissions.openSettings();
                reject('settings');
              } }
            ]);
          }
          return reject('permission denied');
        });
    });
  });
}
