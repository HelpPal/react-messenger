// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ExploreContainer } from 'AppContainers';

export class ExploreScene extends PureComponent {
  render() {
    const { routeScene } = this.props;

    return (
      <ExploreContainer
        routeScene={routeScene}
      />
    );
  }
}

ExploreScene.propTypes = {
  routeScene: PropTypes.func.isRequired,
};

export default ExploreScene;
