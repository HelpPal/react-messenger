// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  FlatList,
  Linking,
} from 'react-native';
import {
  CachedImageView,
  CardReviewListRow,
} from 'AppComponents';
import { Navigator } from 'AppTypes';
import { PRIMARY_COLOR, WHITE } from 'AppColors';
import { WINDOW_WIDTH } from 'AppConstants';
import { mapBoxAccessToken } from 'AppConfig';
import { groupByEveryN, AlertMessage } from 'AppUtilities';
import * as Progress from 'react-native-progress';
import Swiper from 'react-native-swiper';
import Communications from 'react-native-communications';
import OpenMap from 'react-native-open-maps';
import Mapbox from '@mapbox/react-native-mapbox-gl';
import { get } from 'lodash';
import { CardProfileHeader } from './CardProfileHeader';
import { CardProfileAttributes } from './CardProfileAttributes';
import { CardProfileTimes } from './CardProfileTimes';
import { reviewDummyData } from './reviewDummyData';

const demoLink = 'https://image.freepik.com/free-vector/abstract-logo-in-flame-shape_1043-44.jpg';

const styles = StyleSheet.create({
  mapView: {
    width: WINDOW_WIDTH,
    height: 150
  },
  wrapper: {
    height: 120
  },
  slide: {
    width: WINDOW_WIDTH,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
});

Mapbox.setAccessToken(mapBoxAccessToken);

export class CardProfileContainer extends PureComponent {
  componentDidMount() {
    this.props.navigator.setTitle({ title: this.props.cardProfile.name });
  }

  onPhoneClicked = (phone) => {
    Communications
      .phonecall(phone.replace(/[-]/g, '').replace(/[+]/g, '').replace(/ /g, ''), true);
  };

  onMapClicked = (region) => {
    OpenMap({ longitude: region.lng, latitude: region.lat });
  };

  onMessageClicked = () => {
    AlertMessage.fromRequest('Coming soon!');
  };

  onWebsiteClicked = (url) => {
    Linking.openURL(url);
  };

  renderRow = (rowData) => {
    const { cardProfile } = this.props;
    if (rowData.index === 0) {
      return (
        <CardProfileHeader dataSource={cardProfile} />
      );
    }
    if (rowData.index === 1) {
      return (
        <CardProfileAttributes
          dataSource={cardProfile}
          onPhoneClicked={this.onPhoneClicked}
          onMapClicked={this.onMapClicked}
          onMessageClicked={this.onMessageClicked}
          onWebsiteClicked={this.onWebsiteClicked}
        />
      );
    }
    if (rowData.index === 2) {
      return (
        <Mapbox.MapView
          style={styles.mapView}
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={15}
          centerCoordinate={[
            get(cardProfile, 'map.lat', 37.78825),
            get(cardProfile, 'map.lng', -122.4324)
          ]}
        >
          <Mapbox.PointAnnotation
            id={'map_marker'}
            coordinate={[
              get(cardProfile, 'map.lat', 37.78825),
              get(cardProfile, 'map.lng', -122.4324)
            ]}
          />
        </Mapbox.MapView>
      );
    }
    if (rowData.index === 3) {
      return (
        <CardProfileTimes dataSource={cardProfile} />
      );
    }
    if (rowData.index === 4) {
      const images = get(cardProfile, 'images', []);
      const validImages = images
        .filter(i => i.is_photo && !!i.image_url)
        .map(i => i.image_url);

      return (
        <Swiper
          style={styles.wrapper}
          autoplay={true}
          autoplayTimeout={2.5}
          showsButtons={false}
          showsPagination={false}
        >
          {validImages.map((image, index) => {
            const key = index + 1;
            return (
              <View key={key} style={styles.slide}>
                <CachedImageView
                  style={styles.image}
                  resizeMode={'contain'}
                  indicator={Progress.Circle}
                  indicatorProps={{
                    size: 15,
                    thickness: 1,
                    borderWidth: 0,
                    color: PRIMARY_COLOR,
                  }}
                  source={{ uri: demoLink }}
                  threshold={50}
                />
              </View>
            );
          })}
        </Swiper>
      );
    }
    return (
      <CardReviewListRow
        dataSource={rowData.item}
        onItemClicked={this.onCardProfileClicked}
      />
    );
  };

  injectData = (reviews) => {
    const finalData = [
      { id: 'header', isHeader: true },
      { id: 'attributes', isAttributes: true },
      { id: 'map', isMap: true },
      { id: 'times', isMap: true },
      { id: 'swiper', isMap: true },
      ...reviews
    ];

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
    if (index === 3) {
      return 'header0004';
    }
    if (index === 4) {
      return 'header0005';
    }
    return `item${index}-${JSON.stringify(item)}`;
  };

  onCardProfileClicked = (review) => {
    this.props.routeScene(
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

  render() {
    return (
      <FlatList
        data={this.injectData(groupByEveryN(reviewDummyData, 2))}
        showsVerticalScrollIndicator={false}
        renderItem={this.renderRow}
        keyExtractor={this.keyExtractor}
        initialNumToRender={5}
      />
    );
  }
}

CardProfileContainer.propTypes = {
  navigator: PropTypes.shape(Navigator).isRequired,
  routeScene: PropTypes.func.isRequired,
  cardProfile: PropTypes.shape({}).isRequired,
};

export default CardProfileContainer;

