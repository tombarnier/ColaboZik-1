import { Fab, Icon } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PlaylistsList from '../components/playlistsList'

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

  render() {
    const { navigation, playlists } = this.props

    return (
      <BackgroundView>
        <ScrollPlaylists>
          <PlaylistsList playlists={playlists} navigation={navigation}/>
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
    playlists: bindActionCreators(allTheActions.playlists, dispatch)
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
