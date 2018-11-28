import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FlatList } from 'react-native'

import PlaylistCard from './playlistCard'


export default class PlaylistsList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    playlists: PropTypes.array
  }

  _playlistCard = ({ item }) =>
    <PlaylistCard playlist={item} navigation={this.props.navigation}/>

  _playlistKey = (item) => item._id

  render() {
    const { playlists } = this.props

    return (
      <FlatList data={playlists}
                renderItem={this._playlistCard}
                keyExtractor={this._playlistKey}/>
    )
  }
}
