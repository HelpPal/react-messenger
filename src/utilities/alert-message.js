// @flow

import { Alert } from 'react-native';
import _ from 'lodash';
import { SYSTEM_MESSAGES } from 'AppConstants';

const { FROM_REQUEST, TRIM_DURATION_MAX } = SYSTEM_MESSAGES;

const showMessage = (
  title = FROM_REQUEST.title,
  content = FROM_REQUEST.description
) => {
  Alert.alert(title, content);
};

const notSupportedLink = () => {
  const { NOT_SUPPORTED_LINK } = SYSTEM_MESSAGES;
  Alert.alert(NOT_SUPPORTED_LINK.title, NOT_SUPPORTED_LINK.description);
};

const trimDurationMax = (duration) => {
  Alert.alert(TRIM_DURATION_MAX.title, TRIM_DURATION_MAX.description(duration));
};

const fromRequest = (
  error
) => {
  if (_.isPlainObject(error)) {
    const errorObj = error[Object.keys(error)[0]];
    Alert.alert('OpenMed', errorObj.message);
  } else {
    Alert.alert('OpenMed', error);
  }
};

export const AlertMessage = {
  showMessage, fromRequest,
  notSupportedLink, trimDurationMax,
};
