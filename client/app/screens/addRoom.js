import React, {Component} from 'react'
import {View} from 'react-native'
import {Form, Item, Label, Input, Textarea} from 'native-base'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import RoomCard from '../components/roomCard'

const BodyHome = styled.View`
  padding: 10px;
`

export default class AddRoom extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  render() {
    const {navigation} = this.props

    return (
      <View>
        <BodyHome>
          <Form>
            <Item floatingLabel>
              <Label>Nom</Label>
              <Input/>
            </Item>
            <Item floatingLabel>
              <Label>Description</Label>
              <Textarea rowSpan={5} bordered placeholder="Textarea" />
            </Item>
          </Form>
        </BodyHome>
      </View>
    )
  }
}
