/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { Provider } from 'react-redux'
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import StackNavigator from './app/config/routes'
import { store } from './app/config/store'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    );
  }
}
