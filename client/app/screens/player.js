import { Fab, Icon } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Dimensions, View } from 'react-native'
import YouTube from 'react-native-youtube'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'

import { API_KEY_YT } from '../../config'
import allTheActions from '../actions'


const BackgroundView = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.secondary};
`

const TitleText = styled.Text`
  text-align: center;
  font-size: 18px;
  margin: 0px 100px;
`

const youtubeHeight = Dimensions.get('window').width / (16 / 9)

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

    this.setState({
      url: musics[0].embed,
      title: musics[0].title
    })
  }

  next = (direction) => {
    const { id } = this.state
    const { musics } = this.props
    let music

    if (direction === 'forward') {
      if (id === musics.length - 1)
        music = musics[0]
      else
        music = musics[id + 1]
    } else if (direction === 'backward') {
      if (id === 0)
        music = musics[musics.length - 1]
      else
        music = musics[id - 1]
    } else {
      alert('invalid direction')
      return
    }

    this.setState({
      id: musics.indexOf(music),
      url: music.embed,
      title: music.title
    })
  }

  render() {
    const { title, url } = this.state

    return (
      <BackgroundView>
        <YouTube
          videoId={url}           // The YouTube video ID
          play={true}
          fullscreen={false}      // control whether the video should play in fullscreen or inline
          loop={false}
          apiKey={API_KEY_YT}
          onChangeState={(e) => { // control whether the video should loop when ended
            if (e.state === 'ended') this.next('forward')
          }}
          onError={() => {
            this.next('forward')
          }}
          style={{ alignSelf: 'stretch', height: youtubeHeight }}
        />
        <View>
          <Fab
            style={{ backgroundColor: '#5067FF' }}
            position='topRight'
            onPress={() => this.next('forward')}>
            <Icon name='skip-forward'/>
          </Fab>
          <Fab
            style={{ backgroundColor: '#5067FF' }}
            position='topLeft'
            onPress={() => this.next('backward')}>
            <Icon name='skip-backward'/>
          </Fab>
          <TitleText>{title}</TitleText>
        </View>
      </BackgroundView>
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
