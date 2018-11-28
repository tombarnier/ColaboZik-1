import React, { Component } from 'react'
import { Dimensions, Text, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Fab, Icon } from 'native-base'
import YouTube from 'react-native-youtube'
import { API_KEY_YT } from '../../config'

import allTheActions from '../actions'


const {
  height: ScreenHeight,
  width: ScreenWidth
} = Dimensions.get('window')

class Player extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    actions: PropTypes.object,
    musics: PropTypes.array
  }

  state = {
    playlist: [],
    id: 0,
    url: '',
    title: ''
  }

  componentDidMount() {
    const { navigation, musics } = this.props

    if (musics.length === 0) {
      navigation.goBack()
      alert('Playlist vide !')
      return
    }
    this.setState(() => ({ playlist: musics }))
    this.setState(() => ({ url: musics[0].embed }))
    this.setState(() => ({ title: musics[0].title }))
  }

  nextMusic = () => {
    const { playlist, id } = this.state

    let nextMusic = 0
    if (id != playlist.length - 1)
      nextMusic = playlist[id + 1]
    else
      nextMusic = playlist[0]
    let url = nextMusic.embed
    let nextId = playlist.indexOf(nextMusic)
    let title = nextMusic.title
    this.setState({ id: nextId })
    this.setState({ url: url })
    this.setState({ title: title })
  }
  prevMusic = () => {
    const { playlist, id } = this.state

    let prevMusic = 0
    if (id != 0)
      prevMusic = playlist[id - 1]
    else
      prevMusic = playlist[playlist.length - 1]
    let url = prevMusic.embed
    let prevId = playlist.indexOf(prevMusic)
    let title = prevMusic.title
    this.setState({ id: prevId })
    this.setState({ url: url })
    this.setState({ title: title })
  }

  render() {
    const { title, url } = this.state
    return (
      <View>
        <YouTube
          videoId={url}   // The YouTube video ID
          play={true}
          controls={1}            // control playback of video with true/false
          fullscreen={false}       // control whether the video should play in fullscreen or inline
          loop={false}
          apiKey={API_KEY_YT}           // control whether the video should loop when ended
          onError={() => {
            this.nextMusic()
          }}
          style={{ alignSelf: 'stretch', height:'80%' }}
        />
        <View style={{
          width: ScreenWidth
        }}>
          <Fab
            style={{ backgroundColor: '#5067FF' }}
            position='topRight'
            onPress={() => this.nextMusic()}>
            <Icon name='skip-forward'/>
          </Fab>
          <Fab
            style={{ backgroundColor: '#5067FF' }}
            position='topLeft'
            onPress={() => this.prevMusic()}>
            <Icon name='skip-backward'/>
          </Fab>
          <Text style={{
            textAlign: 'center', // <-- the magic
            fontWeight: 'bold',
            fontSize: 18,
            marginTop: 0,
            marginLeft: 100,
            marginRight: 100,
            color: 'white',
            backgroundColor: '#131313'
          }}>{title}</Text>
        </View>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    musics: bindActionCreators(allTheActions.musics, dispatch)
  }
})

const mapStateToProps = state => {
  return {
    musics: state.musics.musics
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
