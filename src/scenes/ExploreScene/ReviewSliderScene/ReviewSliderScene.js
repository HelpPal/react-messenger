// @flow

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ReviewSliderContainer } from 'AppContainers';
import { handleNavigationEvent } from 'AppUtilities';
import { ReactId } from 'AppConnectors';
import { NavigationEvent, Navigator } from 'AppTypes';

export class ReviewSliderScene extends PureComponent {
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
        screenName: 'ReviewSliderContainer',
        reactId: this.reactId,
        isRootOfTab: true
      });
    }
  };

  render() {
    const {
      navigator,
      replaceCurrentScene,
      routeBack,
      selectedReview,
      reviews,
    } = this.props;

    return (
      <ReviewSliderContainer
        navigator={navigator}
        replaceCurrentScene={replaceCurrentScene}
        routeBack={routeBack}
        selectedReview={selectedReview}
        reviews={reviews}
      />
    );
  }
}

ReviewSliderScene.propTypes = {
  navigator: PropTypes.shape(Navigator).isRequired,
  replaceCurrentScene: PropTypes.func.isRequired,
  routeBack: PropTypes.func.isRequired,
  selectedReview: PropTypes.shape({}).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default ReviewSliderScene;
