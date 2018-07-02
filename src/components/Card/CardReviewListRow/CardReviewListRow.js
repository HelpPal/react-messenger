// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';
import { CardImageReviewListItem } from '../CardImageReviewListItem';
import { CardTextReviewListItem } from '../CardTextReviewListItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
});

export function CardReviewListRow({
  dataSource,
  onItemClicked
}) {
  return (
    <View style={styles.container}>
      {dataSource.map((item, index) => {
        const key = index + 1;
        if (item.type === 'text') {
          return (
            <CardTextReviewListItem
              key={key}
              dataSource={item}
              onItemClicked={onItemClicked}
            />
          );
        }
        return (
          <CardImageReviewListItem
            key={key}
            dataSource={item}
            onItemClicked={onItemClicked}
          />
        );
      })}
    </View>
  );
}

CardReviewListRow.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.shape({})),
  onItemClicked: PropTypes.func,
};

CardReviewListRow.defaultProps = {
  dataSource: [],
  onItemClicked: null
};
