// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { WHITE, DARK_FIVE } from 'AppColors';
import { WINDOW_WIDTH } from 'AppConstants';

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: 50,
    alignItems: 'center',
    backgroundColor: DARK_FIVE,
    flexDirection: 'row',
    borderRadius: 6,
    paddingHorizontal: 10
  },
  bigIcon: {
    width: 31,
    height: 31,
    marginRight: 10,
    resizeMode: 'contain'
  },
  smallIcon: {
    width: 16,
    height: 16,
    marginHorizontal: 4,
    resizeMode: 'contain'
  },
  bigText: {
    color: WHITE,
    fontFamily: 'SFUIText-Bold',
    fontSize: 14
  },
  smallText: {
    color: WHITE,
    fontFamily: 'SFUIText-Bold',
    fontSize: 14
  }
});

export function SocialButton({
  style,
  onPress,
  bigIcon,
  bigIconStyle,
  bigText,
  bigTextStyle,
  smallIcon,
  smallIconStyle,
  smallText,
  smallTextStyle
}) {
  return (
    <TouchableOpacity disabled={!onPress} style={[styles.container, style]} onPress={onPress}>
      <Image
        style={[styles.bigIcon, bigIconStyle]}
        source={bigIcon}
      />
      <Text
        allowFontScaling={false}
        style={[styles.bigText, { marginLeft: smallIcon ? 0 : 34 }, bigTextStyle]}
      >
        {bigText}
      </Text>
      {smallIcon &&
        <Image
          style={[styles.smallIcon, smallIconStyle]}
          source={smallIcon}
        />
      }
      {smallText &&
        <Text allowFontScaling={false} style={[styles.smallText, smallTextStyle]}>
          {smallText}
        </Text>
      }
    </TouchableOpacity>
  );
}

SocialButton.propTypes = {
  style: PropTypes.any,
  onPress: PropTypes.func,
  bigIcon: PropTypes.any.isRequired,
  bigIconStyle: PropTypes.any,
  bigTextStyle: PropTypes.any,
  bigText: PropTypes.string.isRequired,
  smallIcon: PropTypes.any,
  smallIconStyle: PropTypes.any,
  smallTextStyle: PropTypes.any,
  smallText: PropTypes.string,
};

SocialButton.defaultProps = {
  onPress: null
};
