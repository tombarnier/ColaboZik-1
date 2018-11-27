import React, { Component } from 'react'
import { Dimensions, Text, View, WebView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Fab, Icon } from 'native-base'

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
    console.log(title)

    this.setState({ id: nextId })
    this.setState({ url: url })
    this.setState({ title: title })
    console.log(nextMusic)
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
        <View style={{ height: ScreenHeight - 175, width: ScreenWidth }}>
          <WebView style={{
            paddingTop: 25,
            backgroundColor: '#f8f8f8',
            width: ScreenWidth,
            height: ScreenHeight
          }}
                   source={{ uri: url }}
                   mediaPlaybackRequiresUserAction={false}
                   javaScriptEnabled={true}
                   scalesPageToFit={true}
          />
        </View>
        <View style={{
          backgroundColor: '#131313',
          height: 175,
          width: ScreenWidth
        }}>
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
