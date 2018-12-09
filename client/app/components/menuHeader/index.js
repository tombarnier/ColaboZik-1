import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button, Icon, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu'

import allTheActions from '../../actions'

const AlignCenter = styled.View`
  align-items: center;
`

const StyledMenu = styled(Menu)`
  background-color: ${props => props.theme.color.foreground};
`

const StyledMenuItem = styled(MenuItem)`
  color: ${props => props.theme.color.text};
`

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.color.text};
`

class MenuHeader extends Component {
  static propTypes = {
    actions: PropTypes.object,
    navigation: PropTypes.object,
    playlist: PropTypes.object,
    theme: PropTypes.object
  }

  _menu = null
  setMenuRef = ref => this._menu = ref
  hideMenu = () => this._menu.hide()
  showMenu = () => this._menu.show()

  _deletePress = () => {
    const { actions, navigation, playlist } = this.props

    this.hideMenu()
    navigation.goBack()
    actions.playlists.deletePlaylist(playlist._id)

    alert(`Delete playlist ${playlist.name}`)
  }

  render() {
    const { navigation } = this.props

    return (
      <AlignCenter>
        <StyledMenu
          ref={this.setMenuRef}
          button={<Button transparent>
            <TouchableOpacity onPress={this.showMenu}>
              <StyledIcon name='more'/>
            </TouchableOpacity>
          </Button>}
        >
          <MenuItem onPress={this._deletePress}>Supprimer</MenuItem>
          <MenuDivider/>
          <MenuItem onPress={this.hideMenu} disabled>Disabled</MenuItem>
        </StyledMenu>
      </AlignCenter>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    playlists: bindActionCreators(allTheActions.playlists, dispatch)
  }
})

const mapStateToProps = state => ({
  playlist: state.playlists.currentPlaylist,
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuHeader)
