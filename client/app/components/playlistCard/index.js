import React, {Component} from 'react'
import {Card, CardItem, Text} from 'native-base'
import PropTypes from 'prop-types'

export default class PlaylistCard extends Component {
  static propTypes = {
    playlist: PropTypes.object,
    navigation: PropTypes.object
  }

  render() {
    const {navigation, playlist} = this.props
    const {title, description} = playlist
    return (
      <Card>
        <CardItem header bordered button onPress={() => navigation.navigate('Playlist', { playlist })}>
          <Text>{title}</Text>
        </CardItem>
        <CardItem bordered>
          <Text>{description}</Text>
        </CardItem>
      </Card>
    )
  }
}
