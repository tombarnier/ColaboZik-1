import { Body, Button, Card, CardItem, Icon, Left, Text, Thumbnail } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'


const RightCard = styled.View`
  align-items: center;
`

export default class MusicCard extends Component {
  static propTypes = {
    music: PropTypes.object
  }

  render() {
    const { title, thumbnail, dislike } = this.props.music
    const counter = dislike !== undefined ? dislike : 0

    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail square large source={{ uri: thumbnail }}/>
            <Body header>
              <Text>{title}</Text>
            </Body>
          </Left>

          <RightCard>
            <Button danger transparent>
              <TouchableOpacity>
                <Icon name='thumbs-down'/>
              </TouchableOpacity>
            </Button>
            <Text style={{ color: counter < 0 ? 'red' : 'black' }}>{counter}</Text>
          </RightCard>
        </CardItem>
      </Card>
    )
  }
}