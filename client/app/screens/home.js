import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Fab, Icon } from 'native-base'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import MenuButton from '../components/menuHeader/menuButton'
import PlaylistsList from '../components/playlistsList'
import StatusBarTranslucent from '../components/StatusBar'

import allTheActions from '../actions'

const BackgroundView = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.background};
`

const ScrollPlaylists = styled.ScrollView`
  padding: 10px;
`

const StyledFab = styled(Fab)`
  background-color: ${props => props.theme.color.primary};
`

class Home extends Component {
  static propTypes = {
    actions: PropTypes.object,
    navigation: PropTypes.object,
    playlists: PropTypes.array,
    user: PropTypes.object
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <MenuButton press={() => {
        navigation.navigate('Settings')
      }} icon='settings' androidIcon='md-settings' iosIcon='ios-settings'/>
    )
  })

  componentDidMount() {
    const { actions, user } = this.props

    actions.playlists.loadPlaylists(user)
  }

  _addPlaylistPress = () => {
    const { navigation } = this.props

    navigation.navigate('AddPlaylist')
  }

  render() {
    const { navigation, playlists } = this.props

    return (
      <BackgroundView>
        {/*<StatusBarTranslucent/>*/}
        <ScrollPlaylists>
          <PlaylistsList playlists={playlists} navigation={navigation}/>
          <Text/>
        </ScrollPlaylists>

        <StyledFab position="bottomRight" onPress={this._addPlaylistPress}>
          <Icon name="add"/>
        </StyledFab>
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
  playlists: state.playlists.playlists,
  user: state.feathers.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
