// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { PRIMARY_COLOR } from 'AppColors';
import { SFSemiBold } from 'AppFonts';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  text: {
    marginTop: 5,
    color: PRIMARY_COLOR,
    fontSize: 14
  }
});

export function IconView({
  icon,
  iconSize,
  text,
  textSize,
  onItemClicked
}) {
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={!onItemClicked}
      onPress={() => onItemClicked()}
    >
      <Icon name={icon} size={iconSize} color={PRIMARY_COLOR} />
      <SFSemiBold style={[styles.text, { fontSize: textSize }]}>
        {text}
      </SFSemiBold>
    </TouchableOpacity>
  );
}

IconView.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onItemClicked: PropTypes.func,
  iconSize: PropTypes.number,
  textSize: PropTypes.number,
};

IconView.defaultProps = {
  iconSize: 22,
  textSize: 14,
  onItemClicked: null,
};
