import React, { Component } from 'react'
import { Dimensions, Text, TouchableOpacity, View, WebView } from 'react-native'

const {
  height: ScreenHeight,
  width: ScreenWidth
} = Dimensions.get('window')

export default class Player extends Component {

  playlist = [{
    id: '1',
    title: 'Music #1',
    thumbnail: 'http://i3.ytimg.com/vi/erLk59H86ww/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/AsVdSicpGpY'
  }, {
    id: '2',
    title: 'Music #2',
    thumbnail: 'http://i3.ytimg.com/vi/k2XREx_nWnA/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/e5nyQmaq4k4'
  }, {
    id: '3',
    title: 'Music #3',
    thumbnail: 'http://i3.ytimg.com/vi/_UgsqtaXiwI/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/Q6zr6kCPj8'
  }, {
    id: '4',
    title: 'Music #4',
    thumbnail: 'http://i3.ytimg.com/vi/vj-5-_h_E8w/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/2QLXGXbcqVg'
  }, {
    id: '5',
    title: 'Music #5',
    thumbnail: 'http://i3.ytimg.com/vi/MHTXEACrjFM/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/G4oDm9TvFVs'
  }, {
    id: '6',
    title: 'Music #6',
    thumbnail: 'http://i3.ytimg.com/vi/IANGdjgF07o/maxresdefault.jpg',
    url: 'https://www.youtube.com/embed/DjK0NU2viVk'
  }]

  constructor() {
    super()
    this.state = {
      url: this.playlist[0].url,
      id: 0
    }
  }

  nextMusic = () => {
    let nextMusic = 0
    if (this.state.id != this.playlist.length - 1)
      nextMusic = this.playlist[this.state.id + 1]
    else
      nextMusic = this.playlist[0]
    let url = nextMusic.url
    let id = parseInt(nextMusic.id) - 1
    this.setState({ id: id })
    this.setState({ url })
  }
  prevMusic = () => {
    let prevMusic = 0
    if (this.state.id != 0)
      prevMusic = this.playlist[this.state.id - 1]
    else
      prevMusic = this.playlist[this.playlist.length - 1]
    let url = prevMusic.url
    let id = parseInt(prevMusic.id) - 1
    this.setState({ id: id })
    this.setState({ url })
  }

  render() {
    return (
      <View>
        <View style={{ height: ScreenHeight - 100, width: ScreenWidth }}>
          <WebView style={{
            paddingTop: 25,
            backgroundColor: '#f8f8f8',
            width: ScreenWidth,
            height: ScreenHeight,
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
        </View>
      </View>
    )
  }
}