// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import { CachedImageView } from 'AppComponents';
import { PRIMARY_COLOR, WHITE } from 'AppColors';
import { SFRegular } from 'AppFonts';
import { get } from 'lodash';
import * as Progress from 'react-native-progress';

const styles = StyleSheet.create({
  detailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  scoreView: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreLabel: {
    color: WHITE,
    fontSize: 16
  },
  categoryView: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  categoryText: {
    fontSize: 14,
    marginVertical: 3
  },
});

export function CardProfileHeader({
  dataSource,
}) {
  const avatarUrl = get(dataSource, 'avatar');
  const categoryImage = get(dataSource, 'categoryImage');
  const categoryName = get(dataSource, 'categoryName');
  const categoryNames = categoryName.split('<br>');

  return (
    <View>
      <View style={styles.detailView}>
        <CachedImageView
          style={styles.avatar}
          borderRadius={3}
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
        <View style={styles.scoreView}>
          <SFRegular style={styles.scoreLabel}>
            {`${get(dataSource, 'score', 0)}%`}
          </SFRegular>
        </View>
      </View>
      <View style={styles.categoryView}>
        <CachedImageView
          style={styles.avatar}
          borderRadius={3}
          resizeMode={'cover'}
          indicator={Progress.Circle}
          indicatorProps={{
            size: 15,
            thickness: 1,
            borderWidth: 0,
            color: PRIMARY_COLOR,
          }}
          source={{ uri: categoryImage }}
          threshold={50}
        />
        <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center' }}>
          {categoryNames.map(c => (
            <SFRegular key={c} style={styles.categoryText}>
              {c}
            </SFRegular>
          ))}
        </View>
      </View>
    </View>
  );
}

CardProfileHeader.propTypes = {
  dataSource: PropTypes.shape({}).isRequired,
};
