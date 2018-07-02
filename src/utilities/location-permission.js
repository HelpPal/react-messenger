import Permissions from 'react-native-permissions';
import { Alert, Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';

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

export function requestLocationAccess(message = null, showAlert = false) {
  return Permissions.check('location').then(status => {
    // response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    if (status === 'authorized') {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      Permissions.request('location')
        .then(response => {
          const canShowAlert =
            (isIOS && status !== 'undetermined' || !isIOS && status !== 'denied') &&
            (isIOS && response === 'denied' || !isIOS && response === 'undetermined');

          if (showAlert && canShowAlert) {
            return Alert.alert(
              'Location services is currently disabled. Would you like to enable?',
              message, [
                { text: 'Cancel', onPress: () => reject('permission denied') },
                { text: 'Yes', onPress: () => {
                  Permissions.openSettings();
                  reject('permission denied');
                } },
              ]);
          }
          if (response === 'authorized') {
            return resolve();
          }
          return reject('permission denied');
        });
    });
  });
}
