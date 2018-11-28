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
  width: ScreenWidth
} = Dimensions.get('window')

class Player extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    actions: PropTypes.object,
    musics: PropTypes.array
  }

  state = {
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
    this.setState(() => ({ url: musics[0].embed }))
    this.setState(() => ({ title: musics[0].title }))
  }

  next = ( next ) => {
    const { id } = this.state
    const { musics } = this.props
    let music = 0
    if (id === musics.length - 1 && next === 'forward') music = musics[0]
    else if ( next === 'forward') music = musics[id +1]
    else if ( id === 0 && next === 'prev' ) music = musics[musics.length - 1]
    else music = musics[id -1]
    let url = music.embed
    let nextId = musics.indexOf(music)
    let title = music.title
    this.setState({
      id: nextId,
      url: url,
      title: title
    })
  }
  render() {
    const { title, url } = this.state
    return (
      <View>
        <YouTube
          videoId={url}   // The YouTube video ID
          play={true}
          fullscreen={false}       // control whether the video should play in fullscreen or inline
          loop={false}
          apiKey={API_KEY_YT}           // control whether the video should loop when ended
          onChangeState={(e) => {
            if (e.state === 'ended') this.next('forward')
          }}
          onError={() => {
            this.next('forward')
          }}
          style={{ alignSelf: 'stretch', height:'80%' }}
        />
        <View style={{
          width: ScreenWidth
        }}>
          <Fab
            style={{ backgroundColor: '#5067FF' }}
            position='topRight'
            onPress={() => this.next('forward')}>
            <Icon name='skip-forward'/>
          </Fab>
          <Fab
            style={{ backgroundColor: '#5067FF' }}
            position='topLeft'
            onPress={() => this.next('prev')}>
            <Icon name='skip-backward'/>
          </Fab>
          <Text style={{
            textAlign: 'center',
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
