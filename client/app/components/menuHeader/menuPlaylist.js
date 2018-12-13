import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import Menu, { MenuDivider, MenuItem } from 'react-native-material-menu'

import allTheActions from '../../actions'
import MenuButton from './menuButton'

const StyledMenu = styled(Menu)`
  background-color: ${props => props.theme.color.foreground};
`

const StyledMenuItem = styled(MenuItem)`
  color: ${props => props.theme.color.text};
`

class MenuPlaylist extends Component {
  static propTypes = {
    actions: PropTypes.object,
    navigation: PropTypes.object,
    playlist: PropTypes.object
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
    return (
      <StyledMenu
        ref={this.setMenuRef}
        button={<MenuButton press={this.showMenu} icon='more'/>}>

        <MenuItem onPress={this._deletePress}>Supprimer</MenuItem>
        <MenuDivider/>
        <MenuItem onPress={this.hideMenu} disabled>Disabled</MenuItem>
      </StyledMenu>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    playlists: bindActionCreators(allTheActions.playlists, dispatch)
  }
})

const mapStateToProps = state => ({
  playlist: state.playlists.currentPlaylist
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuPlaylist)
