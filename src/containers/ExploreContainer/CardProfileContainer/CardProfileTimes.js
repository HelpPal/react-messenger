// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import { BLACK } from 'AppColors';
import { SFRegular } from 'AppFonts';
import { get } from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  times: {
    flexDirection: 'row',
  },
  timeView: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center'
  },
  categoryText: {
    fontSize: 14,
    marginVertical: 3
  },
  attributes: {
    flexDirection: 'row',
  },
  keyword: {
    marginLeft: 10,
    alignSelf: 'center',
    marginTop: -3
  }
});

export function CardProfileTimes({
  dataSource,
}) {
  const hours = get(dataSource, 'hours', '');
  const weeklyHours = hours.split('<br>');

  const extra = get(dataSource, 'extra');
  const keywords = Object.keys(extra);

  return (
    <View style={styles.container}>
      <View style={styles.times}>
        <Icon name={'ios-time'} size={22} color={BLACK} />
        <View style={styles.timeView}>
          {weeklyHours.map(c => (
            <SFRegular key={c} style={styles.categoryText}>
              {c}
            </SFRegular>
          ))}
        </View>
      </View>
      {keywords.map(k => (
        <View key={k} style={[styles.attributes, { marginTop: 5 }]}>
          <Icon
            style={{ alignSelf: 'center' }}
            name={'ios-arrow-dropright'}
            size={22}
            color={BLACK}
          />
          <SFRegular style={styles.keyword}>
            {get(extra, `${k}.value`, '')}
          </SFRegular>
        </View>
      ))}
    </View>
  );
}

CardProfileTimes.propTypes = {
  dataSource: PropTypes.shape({}).isRequired,
};
