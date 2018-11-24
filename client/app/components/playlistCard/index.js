import { Card, CardItem, Text } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import TagBadge from './TagBadge'


const TagList = styled.FlatList`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`

export default class PlaylistCard extends Component {
  static propTypes = {
    playlist: PropTypes.object,
    navigation: PropTypes.object
  }

  _tagBadge = ({ item }) => <TagBadge tag={item}/>


  render() {
    const { navigation, playlist } = this.props
    const { name, tags } = playlist
    console.log(playlist)
    return (
      <Card>
        <CardItem header bordered button onPress={() => navigation.navigate('Playlist', { playlist })}>
          <Text>{name}</Text>
        </CardItem>
        <CardItem bordered>
          <TagList data={tags}
                   renderItem={this._tagBadge}
                   keyExtractor={(item) => item}/>
        </CardItem>
      </Card>
    )
  }
}
