// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
} from 'react-native';
import { Loading, SearchListViewItem } from 'AppComponents';
import { WHITE, PRIMARY_COLOR } from 'AppColors';

import { dummyData } from './dummyData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchList: {
    flex: 1,
    marginHorizontal: 15
  }
});

export class ExploreContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isRefreshing: false,
      dummyData
    };
  }

  onRefresh = () => {

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
    return (
      <SearchListViewItem
        dataSource={item}
        onItemClicked={this.onItemClicked}
      />
    );
  };

  render() {
    const { isLoading, isRefreshing, dummyData: dataSource } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={dataSource}
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

ExploreContainer.propTypes = {
  routeScene: PropTypes.func.isRequired,
};

export default ExploreContainer;

