// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  Loading,
  SearchListViewItem,
  CardProfileListViewItem
} from 'AppComponents';
import { Navigator } from 'AppTypes';
import { WHITE, PRIMARY_COLOR } from 'AppColors';

import { dummyData } from '../dummyData';
import { profileDummyData } from './profileDummyData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchList: {
    flex: 1,
    marginHorizontal: 15
  }
});

export class SearchSimilarContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isRefreshing: false,
      data: [
        {
          ...profileDummyData.data,
          isProfileData: true
        },
        ...dummyData
      ]
    };
  }

  componentDidMount() {
    this.props.navigator.setTitle({ title: profileDummyData.data.name });
  }

  onRefresh = () => {

  };

  onCardProfileClicked = (item) => {
    this.props.routeScene(
      'CardProfileScene',
      { cardProfile: item },
      {
        title: '',
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

  onItemClicked = (item) => {
    this.props.routeScene(
      'SearchSimilarScene',
      { cardID: item.id },
      {
        title: '',
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

  renderRow = ({ item }) => {
    if (item.isProfileData) {
      return (
        <CardProfileListViewItem
          dataSource={item}
          onItemClicked={this.onCardProfileClicked}
        />
      );
    }

    return (
      <SearchListViewItem
        dataSource={item}
        onItemClicked={this.onItemClicked}
      />
    );
  };

  render() {
    const { isLoading, isRefreshing, data } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          style={styles.searchList}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderRow}
          keyExtractor={item => `#${item.id}`}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
        {isLoading && <Loading showOverlay={true} />}
      </View>
    );
  }
}

SearchSimilarContainer.propTypes = {
  navigator: PropTypes.shape(Navigator).isRequired,
  routeScene: PropTypes.func.isRequired,
  cardID: PropTypes.number.isRequired,
};

export default SearchSimilarContainer;

