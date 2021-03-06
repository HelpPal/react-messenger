import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet } from 'react-native';
import { DARK_GRAY } from 'AppColors';

const styles = StyleSheet.create({
  text: {
    color: DARK_GRAY,
    fontSize: 12,
    fontFamily: 'SFUIText-Semibold',
  }
});

export function SFSemiBold({ style, ...props }) {
  return (
    <Text allowFontScaling={false} {...props} style={[styles.text, style]} />
  );
}

SFSemiBold.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.any,
  ]),
  style: Text.propTypes.style,
};
