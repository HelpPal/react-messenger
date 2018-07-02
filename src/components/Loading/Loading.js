// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from 'AppColors';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'AppConstants';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }
});

export function Loading(props) {
  const containerStyle = {
    backgroundColor: props.showOverlay
      ? 'rgba(0, 0, 0, 0.15)'
      : 'transparent',
    zIndex: props.isTopLevel ? 1001 : 0
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <ActivityIndicator
        color={PRIMARY_COLOR}
        {...props}
      />
    </View>
  );
}

Loading.propTypes = {
  ...ActivityIndicator.PropTypes,
  showOverlay: PropTypes.bool,
  isTopLevel: PropTypes.bool,
  animating: PropTypes.bool,
  size: PropTypes.string,
};

Loading.defaultProps = {
  size: 'large',
  animating: true,
  showOverlay: false,
  isTopLevel: false
};
