// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SearchSimilarContainer } from 'AppContainers';
import { handleNavigationEvent } from 'AppUtilities';
import { ReactId } from 'AppConnectors';
import { NavigationEvent, Navigator } from 'AppTypes';

export class SearchSimilarScene extends PureComponent {
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
        screenName: 'SearchSimilarScene',
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
      cardID
    } = this.props;

    return (
      <SearchSimilarContainer
        navigator={navigator}
        routeScene={routeScene}
        routeBack={routeBack}
        cardID={cardID}
      />
    );
  }
}

SearchSimilarScene.propTypes = {
  navigator: PropTypes.shape(Navigator).isRequired,
  routeScene: PropTypes.func.isRequired,
  routeBack: PropTypes.func.isRequired,
  cardID: PropTypes.number.isRequired,
};

export default SearchSimilarScene;
