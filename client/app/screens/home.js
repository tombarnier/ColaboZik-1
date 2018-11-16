import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  render() {
    return (
      <View>
        <Text>Homepage</Text>
      </View>
    )
  }
}
