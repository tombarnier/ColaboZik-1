import { StatusBar } from 'react-native'
import React, { Component } from 'react'

export default class StatusBarTranslucent extends Component {
  render() {
    return (
      <StatusBar
        translucent
        backgroundColor="rgba(0, 0, 0, 0.24)"
        animated
      />
    )
  }
}
