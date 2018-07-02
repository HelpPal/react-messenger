// @flow

import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});

class MessagesScene extends PureComponent {

  render() {
    return (
      <View style={styles.container}>
        <Text>MessagesScene Screen</Text>
      </View>
    );
  }
}

export default MessagesScene;
