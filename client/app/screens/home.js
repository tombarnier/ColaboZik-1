import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Fab, Icon } from 'native-base'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import PlaylistsList from '../components/playlistsList'

import allTheActions from '../actions'

const BackgroundView = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.background};
`

const ScrollPlaylists = styled.ScrollView`
  padding: 10px;
`

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    theme: PropTypes.object,
    actions: PropTypes.object,
    playlists: PropTypes.array,
    user: PropTypes.object
  }

  componentDidMount() {
    const { actions, user } = this.props

    actions.playlists.loadPlaylists(user)
  }

  render() {
    const { navigation, playlists, theme } = this.props

    return (
      <BackgroundView>
        <ScrollPlaylists>
          <PlaylistsList playlists={playlists} navigation={navigation}/>
          <Text/>
        </ScrollPlaylists>

        <Fab
          style={{ backgroundColor: theme.color.button }}
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
    playlists: bindActionCreators(allTheActions.playlists, dispatch)
  }
})

const mapStateToProps = state => ({
  user: state.feathers.user,
  playlists: state.playlists.playlists,
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
