import { Fab, Icon } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import styled from 'styled-components'

import MusicCard from '../components/musicCard'


const ScrollMusic = styled.ScrollView`
  padding: 10px;
`

export default class Playlist extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  musics = [{
    id: '1',
    title: 'Music #1 sdhv uhgo ',
    dislike: -2,
    thumbnail: 'http://i3.ytimg.com/vi/erLk59H86ww/maxresdefault.jpg'
  }, {
    id: '2',
    title: 'Music #2',
    dislike: -35,
    thumbnail: 'http://i3.ytimg.com/vi/k2XREx_nWnA/maxresdefault.jpg'
  }, {
    id: '3',
    title: 'Music #3',
    dislike: 42,
    thumbnail: 'http://i3.ytimg.com/vi/_UgsqtaXiwI/maxresdefault.jpg'
  }, {
    id: '4',
    title: 'Music #4',
    dislike: 0,
    thumbnail: 'http://i3.ytimg.com/vi/vj-5-_h_E8w/maxresdefault.jpg'
  }]

  _musicCard = ({ item }) =>
    <MusicCard music={item} navigation={this.props.navigation}/>

  render() {
    const { navigation } = this.props
    const playlist = navigation.getParam('playlist', undefined)
    if (!playlist) navigation.navigate('Home')

    return (
      <View style={{ flex: 1 }}>
        <ScrollMusic>
          <FlatList data={this.musics}
                    renderItem={this._musicCard}
                    keyExtractor={(item) => item._id}/>
        </ScrollMusic>

        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => navigation.navigate('AddMusic')}>
          <Icon name="add"/>
        </Fab>

        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomLeft"
          onPress={() => navigation.navigate('Player')}>
          <Icon name="play"/>
        </Fab>
      </View>
    )
  }
}
