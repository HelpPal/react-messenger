// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  CardReviewListRow,
  CardImageReviewListItem,
  CardTextReviewListItem
} from 'AppComponents';
import { PRIMARY_COLOR, WHITE, LIGHT_GRAY } from 'AppColors';
import { WINDOW_WIDTH } from 'AppConstants';
import { groupByEveryN } from 'AppUtilities';
import { SFRegular } from 'AppFonts';
import { get } from 'lodash';
import { reviewDummyData } from './reviewDummyData';

const styles = StyleSheet.create({
  text: {
    backgroundColor: LIGHT_GRAY,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    fontSize: 14
  }
});

export class ReviewSliderContainer extends PureComponent {
  onItemClicked = (review) => {
    this.props.replaceCurrentScene(
      'ReviewSliderScene',
      {
        selectedReview: review,
        reviews: reviewDummyData
      },
      {
        title: 'Slider',
        backButtonTitle: '',
        navigatorStyle: {
          navBarHidden: false,
          tabBarHidden: false,
          statusBarTextColorScheme: 'light',
          navBarButtonColor: WHITE,
          screenBackgroundColor: WHITE,
          navBarBackgroundColor: PRIMARY_COLOR,
          navBarTextColor: WHITE,
          navBarTitleTextCentered: true
        }
      }
    );
  };

  renderRow = (rowData) => {
    if (rowData.index === 0) {
      if (rowData.item.data.type === 'text') {
        return (
          <CardTextReviewListItem
            style={{
              width: WINDOW_WIDTH - 20,
              height: (WINDOW_WIDTH - 20) * 0.75
            }}
            textStyle={{ padding: 20, fontSize: 32 }}
            dataSource={rowData.item.data}
          />
        );
      }
      return (
        <CardImageReviewListItem
          style={{
            width: WINDOW_WIDTH - 20,
            height: (WINDOW_WIDTH - 20) * 0.75
          }}
          imageStyle={{
            width: WINDOW_WIDTH - 20,
            height: (WINDOW_WIDTH - 20) * 0.75
          }}
          dataSource={rowData.item.data}
        />
      );
    }
    if (rowData.item.isText) {
      return (
        <SFRegular style={styles.text}>
          {rowData.item.data}
        </SFRegular>
      );
    }

    return (
      <CardReviewListRow
        dataSource={rowData.item}
        onItemClicked={this.onItemClicked}
      />
    );
  };

  injectData = (selectedReview, reviews) => {
    let finalData = [
      { id: 'selectedReview', data: selectedReview },
    ];

    const fullTexts = get(selectedReview, 'fulltexts', []);
    for (let i = 0; i < fullTexts.length; i += 1) {
      finalData.push({
        id: `textField${i}`,
        isText: true,
        data: fullTexts[i]
      });
    }

    finalData = [...finalData, ...reviews];

    return finalData;
  };

  keyExtractor = (item, index) => {
    if (index === 0) {
      return 'header0001';
    }
    if (index === 1) {
      return 'header0002';
    }
    if (index === 2) {
      return 'header0003';
    }
    return `item${index}-${JSON.stringify(item)}`;
  };

  render() {
    const { selectedReview, reviews } = this.props;

    return (
      <FlatList
        data={this.injectData(selectedReview, groupByEveryN(reviews, 2))}
        showsVerticalScrollIndicator={false}
        renderItem={this.renderRow}
        keyExtractor={this.keyExtractor}
        initialNumToRender={4}
      />
    );
  }
}

ReviewSliderContainer.propTypes = {
  replaceCurrentScene: PropTypes.func.isRequired,
  selectedReview: PropTypes.shape({}).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ReviewSliderContainer;

