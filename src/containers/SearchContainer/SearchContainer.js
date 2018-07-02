// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import { WHITE, LIGHT_GRAY, PRIMARY_COLOR } from 'AppColors';
import { SearchListViewItem } from 'AppComponents';
import { SearchBar } from 'react-native-elements';

import { dummyData } from './dummyData';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  searchBar: {
    backgroundColor: WHITE,
    borderBottomWidth: 0
  },
  searchBarInput: {
    backgroundColor: LIGHT_GRAY,
    fontSize: 14
  },
  searchList: {
    flex: 1,
    marginHorizontal: 15
  }
});

class SearchContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: dummyData
    };
  }

  onCancelButtonPressed = () => {

  };

  onSearchTextChanged = (e) => {
    console.log(e);
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
    const { data } = this.state;

    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          showLoading
          round
          platform="ios"
          cancelButtonTitle="Cancel"
          containerStyle={styles.searchBar}
          inputStyle={styles.searchBarInput}
          onChangeText={this.onSearchTextChanged}
          onClear={this.onCancelButtonPressed}
          placeholder={'Search...'}
          clearIcon={{ color: '#86939e', name: 'close' }}
        />
        <FlatList
          data={data}
          style={styles.searchList}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderRow}
          keyExtractor={item => `#${item.id}`}
        />
      </View>
    );
  }
}

SearchContainer.propTypes = {
  routeScene: PropTypes.func.isRequired,
};

export default SearchContainer;
