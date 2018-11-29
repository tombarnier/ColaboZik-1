import { Card, CardItem, Text } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'

import TagsList from '../tagsList'

export default class PlaylistCard extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    playlist: PropTypes.object
  }

  render() {
    const { navigation, playlist } = this.props
    const { name, tags } = playlist

    return (
      <Card>
        <TouchableOpacity onPress={() => navigation.navigate('Playlist', { playlist })}>
          <CardItem header bordered>
            <Text>{name}</Text>
          </CardItem>

          <CardItem bordered>
            <TagsList tags={tags}/>
          </CardItem>
        </TouchableOpacity>
      </Card>
    )
  }
}
