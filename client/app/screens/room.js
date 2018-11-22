import React, {Component} from 'react'
import {View, FlatList} from 'react-native'
import {Fab, Icon, List, ListItem} from 'native-base'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MusicCard from '../components/musicCard'

const ScrollMusic = styled.ScrollView`
  padding: 10px;
`

export default class Room extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  musics = [{
    id: '1',
    title: 'Music #1',
    thumbnail: 'http://i3.ytimg.com/vi/erLk59H86ww/maxresdefault.jpg'
  }, {
    id: '2',
    title: 'Music #2',
    thumbnail: 'http://i3.ytimg.com/vi/k2XREx_nWnA/maxresdefault.jpg'
  }, {
    id: '3',
    title: 'Music #3',
    thumbnail: 'http://i3.ytimg.com/vi/_UgsqtaXiwI/maxresdefault.jpg'
  }, {
    id: '4',
    title: 'Music #4',
    thumbnail: 'http://i3.ytimg.com/vi/vj-5-_h_E8w/maxresdefault.jpg'
  }, {
    id: '5',
    title: 'Music #5',
    thumbnail: 'http://i3.ytimg.com/vi/MHTXEACrjFM/maxresdefault.jpg'
  }, {
    id: '6',
    title: 'Music #6',
    thumbnail: 'http://i3.ytimg.com/vi/IANGdjgF07o/maxresdefault.jpg'
  }]

  _musicCard = ({item}) =>
    <MusicCard music={item} navigation={this.props.navigation}/>

  render() {
    const {navigation} = this.props
    const room = navigation.getParam('room', undefined)
    if (!room) navigation.navigate('ListRooms')

    return (
      <View style={{flex: 1}}>
        <ScrollMusic>
          <FlatList data={this.musics}
                    renderItem={this._musicCard}
                    keyExtractor={(item) => item.thumbnail}/>
        </ScrollMusic>

        <Fab
          style={{backgroundColor: '#5067FF'}}
          position="bottomRight"
          onPress={() => navigation.navigate('AddTrack')}>
          <Icon name="add"/>
        </Fab>
      </View>
    )
  }
}
