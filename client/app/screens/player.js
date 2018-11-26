import React, { Component } from 'react'
import { Dimensions, Text, TouchableOpacity, View, WebView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'


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
    url: ''
  }
  componentDidMount() {
    const { navigation, actions } = this.props
    const playlist = navigation.getParam('playlist', undefined)

    actions.musics.loadMusic(playlist._id)
    this.setState(() => ({ playlist: this.props.musics }))
    this.setState(() => ({ url: this.props.musics[0].embed }))

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
    let id = parseInt(nextMusic.id) - 1
    this.setState({ id: id })
    this.setState({ url: url })
  }
  prevMusic = () => {
    let prevMusic = 0
    if (this.state.id != 0)
      prevMusic = this.state.playlist[this.state.id - 1]
    else
      prevMusic = this.state.playlist[this.playlist.length - 1]
    let url = prevMusic.embed
    let id = parseInt(prevMusic.id) - 1
    this.setState({ id: id })
    this.setState({ url: url })
  }

  render() {
    return (
      <View>
        <View style={{ height: ScreenHeight - 100, width: ScreenWidth }}>
          <WebView style={{
            paddingTop: 25,
            backgroundColor: '#f8f8f8',
            width: ScreenWidth,
            height: ScreenHeight
          }}
                   source={{ uri: this.state.url }}/>
        </View>
        <View style={{
          backgroundColor: '#131313',
          height: 100,
          width: ScreenWidth
        }}>
          <View style={{
            width: ScreenWidth
          }}>
            <TouchableOpacity onPress={() => this.nextMusic()}><Text
              style={{ color: '#fff', padding: 10, fontSize: 15 }}>Next</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => this.prevMusic()}><Text
              style={{ color: '#fff', padding: 10, fontSize: 15 }}>Prev</Text></TouchableOpacity>
          </View>
          <Text> </Text>
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
