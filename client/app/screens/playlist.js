import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Fab, Icon } from 'native-base'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import MusicsList from '../components/musicsList'

import allTheActions from '../actions'

const BackgroundView = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.background};
`

const ScrollMusic = styled.ScrollView`
  padding: 10px;
`

const StyledFab = styled(Fab)`
  background-color: ${props => props.theme.color.button};
`

class Playlist extends Component {
  static propTypes = {
    actions: PropTypes.object,
    musics: PropTypes.array,
    navigation: PropTypes.object,
    theme: PropTypes.object
  }

  componentDidMount() {
    const { actions, navigation } = this.props
    const playlist = navigation.getParam('playlist', undefined)

    if (!playlist) navigation.goBack()

    actions.playlists.selectPlaylist(playlist)
    actions.musics.loadMusic(playlist._id)
  }

  componentWillUnmount() {
    const { actions } = this.props

    actions.playlists.deselectPlaylist()
    actions.musics.unloadMusic()
  }

  _addMusicPress = () => {
    const { navigation } = this.props

    navigation.navigate('AddMusic')
  }

  _playerPress = () => {
    const { navigation } = this.props

    navigation.navigate('Player')
  }

  render() {
    const { musics, navigation } = this.props

    return (
      <BackgroundView>
        <ScrollMusic>
          <MusicsList musics={musics} navigation={navigation}/>
          <Text/>
        </ScrollMusic>

        <StyledFab
          position="bottomRight"
          onPress={this._addMusicPress}>
          <Icon name="add"/>
        </StyledFab>

        <StyledFab
          position="bottomLeft"
          onPress={this._playerPress}>
          <Icon name="play"/>
        </StyledFab>
      </BackgroundView>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    musics: bindActionCreators(allTheActions.musics, dispatch),
    playlists: bindActionCreators(allTheActions.playlists, dispatch)
  }
})

const mapStateToProps = state => ({
  musics: state.musics.musics,
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist)
