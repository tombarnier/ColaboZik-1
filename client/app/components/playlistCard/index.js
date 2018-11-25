import { Card, CardItem, Text } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

import TagBadge from './TagBadge'


const TagList = styled.FlatList`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`

export default class PlaylistCard extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    playlist: PropTypes.object
  }

  _tagBadge = ({ item }) => <TagBadge tag={item}/>

  _tagKey = (item) => item

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
            <TagList data={tags}
                     renderItem={this._tagBadge}
                     keyExtractor={this._tagKey}/>
          </CardItem>
        </TouchableOpacity>
      </Card>
    )
  }
}
