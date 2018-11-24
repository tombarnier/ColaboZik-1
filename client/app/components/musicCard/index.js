import { Body, Button, Card, CardItem, Icon, Left, Text, Thumbnail } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'


const RightCard = styled.View`
  align-items: center;
`

export default class MusicCard extends Component {
  static propTypes = {
    music: PropTypes.object,
    navigation: PropTypes.object
  }

  render() {
    const { navigation, music } = this.props
    const { title, thumbnail, dislike } = music
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
            <Button danger>
              <Icon name='thumbs-down'/>
            </Button>
            <Text style={{ color: dislike < 0 ? 'red' : 'black' }}>{dislike}</Text>
          </RightCard>
        </CardItem>
      </Card>
    )
  }
}
