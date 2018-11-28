import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FlatList } from 'react-native'

import MusicCard from './musicCard'


export default class MusicsList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    musics: PropTypes.array
  }

  _musicCard = ({ item }) =>
    <MusicCard music={item} navigation={this.props.navigation}/>

  _musicKey = (item) => item._id

  render() {
    const { musics } = this.props

    return (
      <FlatList data={musics}
                renderItem={this._musicCard}
                keyExtractor={this._musicKey}/>
    )
  }
}
