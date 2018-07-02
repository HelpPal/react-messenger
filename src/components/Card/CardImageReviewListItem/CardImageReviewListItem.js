// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { CachedImageView } from 'AppComponents';
import { PRIMARY_COLOR } from 'AppColors';
import { WINDOW_WIDTH } from 'AppConstants';
import { get } from 'lodash';
import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
  container: {
    width: (WINDOW_WIDTH * 0.5) - 20,
    height: ((WINDOW_WIDTH * 0.5) - 20) * 0.75,
    margin: 10,
    elevation: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: -2, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    shadowColor: 'black',
  },
  image: {
    width: (WINDOW_WIDTH * 0.5) - 20,
    height: ((WINDOW_WIDTH * 0.5) - 20) * 0.75,
  },
});

export function CardImageReviewListItem({
  style,
  imageStyle,
  dataSource,
  onItemClicked
}) {
  return (
    <TouchableOpacity
      disabled={!onItemClicked}
      onPress={() => onItemClicked(dataSource)}
      style={[styles.container, style]}
    >
      <View style={{ flex: 1, borderRadius: 10, overflow: 'hidden' }}>
        <CachedImageView
          style={[styles.image, imageStyle]}
          borderRadius={10}
          resizeMode={'cover'}
          indicator={Progress.Circle}
          indicatorProps={{
            size: 15,
            thickness: 1,
            borderWidth: 0,
            color: PRIMARY_COLOR,
          }}
          source={{ uri: get(dataSource, 'image_url') }}
          threshold={50}
        />
      </View>
    </TouchableOpacity>
  );
}

CardImageReviewListItem.propTypes = {
  style: PropTypes.shape({}),
  imageStyle: PropTypes.shape({}),
  dataSource: PropTypes.shape({}),
  onItemClicked: PropTypes.func,
};

CardImageReviewListItem.defaultProps = {
  style: {},
  imageStyle: {},
  dataSource: {},
  onItemClicked: null
};
