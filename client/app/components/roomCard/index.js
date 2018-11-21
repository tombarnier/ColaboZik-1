import React, {Component} from 'react'
import {Card, CardItem, Text} from 'native-base'
import PropTypes from 'prop-types'

export default class RoomCard extends Component {
  static propTypes = {
    room: PropTypes.object,
    navigation: PropTypes.object
  }

  render() {
    const {name, description} = this.props.room
    return (
      <Card>
        <CardItem header bordered button onPress={() => alert('This is Card Body')}>
          <Text>{name}</Text>
        </CardItem>
        <CardItem bordered>
          <Text>{description}</Text>
        </CardItem>
      </Card>
    )
  }
}