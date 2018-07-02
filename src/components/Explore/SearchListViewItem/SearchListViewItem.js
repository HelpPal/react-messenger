// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { CachedImageView } from 'AppComponents';
import { PRIMARY_COLOR, WHITE, LIGHT_GRAY } from 'AppColors';
import { SFBold } from 'AppFonts';
import { WINDOW_WIDTH } from 'AppConstants';
import { get } from 'lodash';
import * as Progress from 'react-native-progress';

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
    flexDirection: 'row',
    backgroundColor: LIGHT_GRAY,
    paddingHorizontal: 10
  },
  text: {
    flex: 1,
    marginRight: 10,
    fontSize: 14
  },
  scoreView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreLabel: {
    color: WHITE,
    fontSize: 16
  }
});

export function SearchListViewItem({
  dataSource,
  onItemClicked
}) {
  const avatarUrl = get(dataSource, 'src');
  const text = get(dataSource, 'text', '');
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
          <SFBold style={styles.text} numberOfLines={2}>
            {text}
          </SFBold>
          <View style={styles.scoreView}>
            <SFBold style={styles.scoreLabel}>
              {score}
            </SFBold>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

SearchListViewItem.propTypes = {
  dataSource: PropTypes.shape({}),
  onItemClicked: PropTypes.func,
};

SearchListViewItem.defaultProps = {
  dataSource: {},
  onItemClicked: null
};
