import React, {Component} from 'react'
import {Card, CardItem, Text} from 'native-base'
import PropTypes from 'prop-types'

export default class RoomCard extends Component {
  static propTypes = {
    room: PropTypes.object,
    navigation: PropTypes.object
  }

  render() {
    const {navigation, room} = this.props
    const {title, description} = room
    return (
      <Card>
        <CardItem header bordered button onPress={() => navigation.navigate('Room', {
          room
        })}>
          <Text>{title}</Text>
        </CardItem>
        <CardItem bordered>
          <Text>{description}</Text>
        </CardItem>
      </Card>
    )
  }
}
