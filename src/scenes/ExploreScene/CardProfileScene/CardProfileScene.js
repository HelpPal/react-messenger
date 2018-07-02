// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CardProfileContainer } from 'AppContainers';
import { handleNavigationEvent } from 'AppUtilities';
import { ReactId } from 'AppConnectors';
import { NavigationEvent, Navigator } from 'AppTypes';

export class CardProfileScene extends PureComponent {
  reactId: number;

  constructor(props, context) {
    super(props, context);
    this.reactId = ReactId.generate();
  }

  componentWillMount() {
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (e: NavigationEvent) => {
    if (e.id === 'back') {
      this.props.routeBack();
    } else {
      handleNavigationEvent({
        event: e,
        screenName: 'CardProfileScene',
        reactId: this.reactId,
        isRootOfTab: true
      });
    }
  };

  render() {
    const {
      navigator,
      routeScene,
      routeBack,
      cardProfile
    } = this.props;

    return (
      <CardProfileContainer
        navigator={navigator}
        routeScene={routeScene}
        routeBack={routeBack}
        cardProfile={cardProfile}
      />
    );
  }
}

CardProfileScene.propTypes = {
  navigator: PropTypes.shape(Navigator).isRequired,
  routeScene: PropTypes.func.isRequired,
  routeBack: PropTypes.func.isRequired,
  cardProfile: PropTypes.shape({}).isRequired,
};

export default CardProfileScene;
