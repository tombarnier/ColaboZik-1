import React, {Component} from 'react'
import {View, Card, CardItem, Text, Image, Left, Right, Body, Thumbnail, Icon, Button} from 'native-base'
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
        <CardItem>
          <Left>
            <Thumbnail square large source={{uri: thumbnail}} />
            <Body header>
              <Text>{title}</Text>
            </Body>
          </Left>
          <Right>
            <Button danger>
              <Icon name="trash" />
            </Button>
          </Right>
        </CardItem>
      </Card>
    )
  }
}
