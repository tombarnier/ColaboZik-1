import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {Form, Item, Label, Input, Textarea} from 'native-base'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const BodyHome = styled.View`
  padding: 10px;
`

export default class AddRoom extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  render() {
    const {navigation} = this.props
    const room = navigation.getParam('room', undefined)
    if (!room) navigation.navigate('ListRooms')

    return (
      <View>
        <BodyHome>
          <Text>{room.id}</Text>
        </BodyHome>
      </View>
    )
  }
}
