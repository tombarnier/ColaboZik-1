import { Fab, Icon } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { FlatList, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PlaylistCard from '../components/playlistCard'

import allTheActions from '../actions'


const BackgroundView = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.secondary};
`

const ScrollPlaylists = styled.ScrollView`
  padding: 10px;
`

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    actions: PropTypes.object,
    playlists: PropTypes.array,
    user: PropTypes.object
  }

  componentDidMount() {
    const { actions, user } = this.props
    actions.playlists.loadPlaylists()
  }

  _playlistCard = ({ item }) =>
    <PlaylistCard playlist={item} navigation={this.props.navigation}/>

  _playlistKey = (item) => item._id

  render() {
    const { navigation, playlists } = this.props

    return (
      <BackgroundView>
        <ScrollPlaylists>
          <FlatList data={playlists}
                    renderItem={this._playlistCard}
                    keyExtractor={this._playlistKey}/>
          <Text/>
        </ScrollPlaylists>

        <Fab
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => navigation.navigate('AddPlaylist')}>
          <Icon name="add"/>
        </Fab>
      </BackgroundView>
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
