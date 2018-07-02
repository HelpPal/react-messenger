// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native';
import { WHITE, PRIMARY_COLOR } from 'AppColors';
import { SFBold } from 'AppFonts';
import { WINDOW_WIDTH } from 'AppConstants';
import { get } from 'lodash';

const styles = StyleSheet.create({
  container: {
    width: (WINDOW_WIDTH * 0.5) - 20,
    height: ((WINDOW_WIDTH * 0.5) - 20) * 0.75,
    margin: 10,
    backgroundColor: PRIMARY_COLOR,
    padding: 5,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: -2, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowColor: 'black',
  },
  text: {
    color: WHITE,
    fontSize: 18
  },
});

export function CardTextReviewListItem({
  style,
  textStyle,
  dataSource,
  onItemClicked
}) {
  return (
    <TouchableOpacity
      disabled={!onItemClicked}
      onPress={() => onItemClicked(dataSource)}
      style={[styles.container, style]}
    >
      <SFBold style={[styles.text, textStyle]}>
        {get(dataSource, 'text', '')}
      </SFBold>
    </TouchableOpacity>
  );
}

CardTextReviewListItem.propTypes = {
  style: PropTypes.shape({}),
  textStyle: PropTypes.shape({}),
  dataSource: PropTypes.shape({}),
  onItemClicked: PropTypes.func,
};

CardTextReviewListItem.defaultProps = {
  style: {},
  textStyle: {},
  dataSource: {},
  onItemClicked: null
};
