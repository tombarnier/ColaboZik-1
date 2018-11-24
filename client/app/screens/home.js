import { Fab, Icon } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FlatList, Text, View } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PlaylistCard from '../components/playlistCard'

import allTheActions from '../actions'


const ScrollPlaylists = styled.ScrollView`
  padding: 10px;
`

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  componentDidMount() {
    const { actions, user } = this.props
    actions.playlists.loadPlaylists()
  }

  _playlistCard = ({ item }) =>
    <PlaylistCard playlist={item} navigation={this.props.navigation}/>

  render() {
    const { navigation } = this.props

    return (
      <View style={{ flex: 1 }}>
        <ScrollPlaylists>
          <FlatList data={this.props.playlists}
                    renderItem={this._playlistCard}
                    keyExtractor={(item) => item._id}/>
          <Text></Text>
        </ScrollPlaylists>

        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => navigation.navigate('AddPlaylist')}>
          <Icon name="add"/>
        </Fab>
      </View>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    playlists: bindActionCreators(allTheActions.playlists, dispatch),
  }
})

const mapStateToProps = state => {
  return {
    user: state.feathers.user,
    playlists: state.playlists.playlists
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
