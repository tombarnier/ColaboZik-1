import { FlatList } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import VideoCard from './videoCard'

export default class VideosList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    videos: PropTypes.array
  }

  _videoCard = ({ item }) =>
    <VideoCard video={item} navigation={this.props.navigation}/>

  _videoKey = (item) => item.id.videoId

  render() {
    const { videos } = this.props

    return (
      <FlatList data={videos}
                renderItem={this._videoCard}
                keyExtractor={this._videoKey}/>
    )
  }
}
