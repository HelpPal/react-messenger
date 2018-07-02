// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SettingsContainer } from 'AppContainers';

export class SettingsScene extends PureComponent {
  render() {
    const { routeScene } = this.props;

    return (
      <SettingsContainer
        routeScene={routeScene}
      />
    );
  }
}

SettingsScene.propTypes = {
  routeScene: PropTypes.func.isRequired,
};

export default SettingsScene;
