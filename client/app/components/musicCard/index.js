import React, {Component} from 'react'
import {View, Card, CardItem, Text, Image} from 'native-base'
import PropTypes from 'prop-types'

export default class MusicCard extends Component {
  static propTypes = {
    music: PropTypes.object,
    navigation: PropTypes.object
  }

  render() {
    const {navigation, music} = this.props
    const {title, thumbnail} = music
    return (
      <Card>
        <CardItem bordered>
          <Text>{thumbnail}</Text>
        </CardItem>
        <CardItem header bordered button>
          <Text>{title}</Text>
        </CardItem>
      </Card>
    )
  }
}
