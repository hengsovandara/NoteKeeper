/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const Realm = require('realm');

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = { realm: null };
  }

  componentWillMount() {
    Realm.open({
      schema: [{name: 'Cat', properties: {name: 'string'}}]
    }).then(realm => {
      realm.write(() => {
        realm.create('Cat', {name: 'Rex'});
      });
      this.setState({ realm });
    });
  }

  render() {
    const info = this.state.realm
      ? 'Number of cats in this Realm: ' + this.state.realm.objects('Cat').length
      : 'Loading...';

    console.log(this.state.realm)
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {info}
        </Text>
      </View>
    );
  }
}
