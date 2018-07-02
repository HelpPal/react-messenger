// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SearchContainer } from 'AppContainers';

class SearchScene extends PureComponent {

  render() {
    const { routeScene } = this.props;

    return (
      <SearchContainer
        routeScene={routeScene}
      />
    );
  }
}

SearchScene.propTypes = {
  routeScene: PropTypes.func.isRequired,
};

export default SearchScene;
