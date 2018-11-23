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
    const {nom, tags} = playlist
    console.log(playlist)
    return (
      <Card>
        <CardItem header bordered button onPress={() => navigation.navigate('Playlist', { playlist })}>
          <Text>{nom}</Text>
        </CardItem>
        <CardItem bordered>
          <Text>{tags}</Text>
        </CardItem>
      </Card>
    )
  }
}
