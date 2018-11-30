import { Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import YouTube from 'react-native-youtube'

import { API_KEY_YT } from '../../../config'

const youtubeHeight = Dimensions.get('window').width / (16 / 9)

export default class MusicPlayer extends Component {
  static propTypes = {
    url: PropTypes.string,
    forward: PropTypes.func
  }

  render() {
    const { url, forward } = this.props

    return (
      <YouTube
        videoId={url}           // The YouTube video ID
        play={true}
        fullscreen={false}      // control whether the video should play in fullscreen or inline
        loop={false}
        apiKey={API_KEY_YT}
        onChangeState={(e) => { // control whether the video should loop when ended
          if (e.state === 'ended') forward()
        }}
        onError={forward}
        style={{ alignSelf: 'stretch', height: youtubeHeight }}
      />
    )
  }
}
