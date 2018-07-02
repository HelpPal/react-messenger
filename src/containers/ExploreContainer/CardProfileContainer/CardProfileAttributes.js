// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
} from 'react-native';
import { IconView } from 'AppComponents';
import { SFRegular } from 'AppFonts';
import { PRIMARY_COLOR, WHITE } from 'AppColors';
import { get } from 'lodash';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  attributes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  keyword: {
    paddingVertical: 5,
    paddingHorizontal: 4,
    backgroundColor: PRIMARY_COLOR,
    color: WHITE,
    borderRadius: 6,
    overflow: 'hidden'
  }
});

export function CardProfileAttributes({
  dataSource,
  onPhoneClicked,
  onMapClicked,
  onMessageClicked,
  onWebsiteClicked,
}) {
  const phone = get(dataSource, 'phone');
  const region = get(dataSource, 'map', {});
  const url = get(dataSource, 'url');
  const extra = get(dataSource, 'extra');
  const keywords = Object.keys(extra);

  return (
    <View style={styles.container}>
      <View style={styles.attributes}>
        <IconView
          icon={'ios-call'}
          text={'phone'}
          onItemClicked={onPhoneClicked ? () => onPhoneClicked(phone) : null}
        />
        <IconView
          icon={'ios-navigate'}
          text={'map'}
          onItemClicked={onMapClicked ? () => onMapClicked(region) : null}
        />
        <IconView
          icon={'ios-chatbubbles'}
          text={'message'}
          onItemClicked={onMessageClicked ? () => onMessageClicked() : null}
        />
        <IconView
          icon={'ios-link'}
          text={'website'}
          onItemClicked={onWebsiteClicked ? () => onWebsiteClicked(url) : null}
        />
      </View>
      <View style={[styles.attributes, { marginTop: 20 }]}>
        {keywords.map(k => (
          <SFRegular key={k} style={styles.keyword}>
            {get(extra, `${k}.value`, '')}
          </SFRegular>
        ))}
      </View>
    </View>
  );
}

CardProfileAttributes.propTypes = {
  dataSource: PropTypes.shape({}).isRequired,
  onPhoneClicked: PropTypes.func,
  onMapClicked: PropTypes.func,
  onMessageClicked: PropTypes.func,
  onWebsiteClicked: PropTypes.func,
};

CardProfileAttributes.defaultProps = {
  onPhoneClicked: null,
  onMapClicked: null,
  onMessageClicked: null,
  onWebsiteClicked: null,
};
