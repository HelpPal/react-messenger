// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { CachedImageView } from 'AppComponents';
import { PRIMARY_COLOR, WHITE, LIGHT_GRAY } from 'AppColors';
import { SFBold } from 'AppFonts';
import { WINDOW_WIDTH } from 'AppConstants';
import { get } from 'lodash';
import * as Progress from 'react-native-progress';
import Emoji from '@ardentlabs/react-native-emoji';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 4,
    elevation: 2,
    shadowOffset: { width: -1, height: 1 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    shadowColor: 'black',
  },
  avatar: {
    flex: 1,
    height: WINDOW_WIDTH * 0.4
  },
  detailView: {
    flex: 1,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: LIGHT_GRAY
  },
  scoreView: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreLabel: {
    color: WHITE,
    fontSize: 16
  }
});

export function CardProfileListViewItem({
  dataSource,
  onItemClicked
}) {
  const avatarUrl = get(dataSource, 'avatar');
  const score = get(dataSource, 'score', 0);

  return (
    <TouchableOpacity
      disabled={!onItemClicked}
      onPress={() => onItemClicked(dataSource)}
      style={styles.container}
    >
      <View style={{ flex: 1, borderRadius: 10, overflow: 'hidden' }}>
        <CachedImageView
          style={styles.avatar}
          resizeMode={'cover'}
          indicator={Progress.Circle}
          indicatorProps={{
            size: 15,
            thickness: 1,
            borderWidth: 0,
            color: PRIMARY_COLOR,
          }}
          source={{ uri: avatarUrl }}
          threshold={50}
        />
        <View style={styles.detailView}>
          <Text style={{ fontSize: 34 }}><Emoji name="grinning" /></Text>
          <Text style={{ fontSize: 34, marginLeft: 20 }}><Emoji name="angry" /></Text>
        </View>
        <View style={styles.scoreView}>
          <SFBold style={styles.scoreLabel}>
            {score}
          </SFBold>
        </View>
      </View>
    </TouchableOpacity>
  );
}

CardProfileListViewItem.propTypes = {
  dataSource: PropTypes.shape({}),
  onItemClicked: PropTypes.func,
};

CardProfileListViewItem.defaultProps = {
  dataSource: {},
  onItemClicked: null
};
