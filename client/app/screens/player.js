import React, { Component } from 'react'
import { Dimensions, Text, TouchableOpacity, View, WebView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {Fab, Icon} from 'native-base'


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
    const { navigation, actions } = this.props
    const playlist = navigation.getParam('playlist', undefined)

    actions.musics.loadMusic(playlist._id)
    this.setState(() => ({ playlist: this.props.musics }))
    this.setState(() => ({ url: this.props.musics[0].embed }))
    this.setState(() => ({ title: this.props.musics[0].title }))
  }

  componentWillUnmount() {
    const { actions } = this.props

    actions.musics.unloadMusic()
  }
  nextMusic = () => {
    let nextMusic = 0
    if (this.state.id != this.state.playlist.length - 1)
      nextMusic = this.state.playlist[this.state.id + 1]
    else
      nextMusic = this.state.playlist[0]
    let url = nextMusic.embed
    let id = this.state.playlist.indexOf(nextMusic)
    let title = nextMusic.title
    console.log(title)

    this.setState({ id: id })
    this.setState({ url: url })
    this.setState({ title: title })
    console.log(nextMusic)
  }
  prevMusic = () => {
    let prevMusic = 0
    if (this.state.id != 0)
      prevMusic = this.state.playlist[this.state.id - 1]
    else
      prevMusic = this.state.playlist[this.state.playlist.length - 1]
    let url = prevMusic.embed
    let id = this.state.playlist.indexOf(prevMusic)
    let title = prevMusic.title
    this.setState({ id: id })
    this.setState({ url: url })
    this.setState({ title: title })
  }

  render() {
    const {title} = this.state.title
    return (
      <View>
        <View style={{ height: ScreenHeight - 175, width: ScreenWidth }}>
          <WebView style={{
            paddingTop: 25,
            backgroundColor: '#f8f8f8',
            width: ScreenWidth,
            height: ScreenHeight,
          }}
                  source={{ uri: this.state.url }}
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
            style={{backgroundColor: '#5067FF'}}
            position="topRight"
            onPress={() => this.nextMusic()}>
            <Icon name="play"/>
          </Fab>
          <Fab
          style={{backgroundColor: '#5067FF'}}
          position="topLeft"
          onPress={() => this.prevMusic()}>
          <Icon name="play"/>
        </Fab>
        <Text style={{textAlign: 'center', // <-- the magic
          fontWeight: 'bold',
          fontSize: 18,
          marginTop: 0,
          marginLeft: 100,
          marginRight: 100,
          color:'white',
          backgroundColor: '#131313',}}>{this.state.title}</Text>
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
