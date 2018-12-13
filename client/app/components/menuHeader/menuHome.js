import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import Menu, { MenuItem } from 'react-native-material-menu'

import allTheActions from '../../actions'
import MenuButton from './menuButton'
import { themeDark, themeLight } from '../../config/themes'

const StyledMenu = styled(Menu)`
  background-color: ${props => props.theme.color.foreground};
`

const StyledMenuItem = styled(MenuItem)`
  color: ${props => props.theme.color.text};
`

class MenuHome extends Component {
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

  _changeTheme = (theme) => {
    const { actions } = this.props

    this.hideMenu()
    actions.themes.changeTheme(theme)
  }

  _themeDarkPress = () => this._changeTheme(themeDark)
  _themeLightPress = () => this._changeTheme(themeLight)

  render() {
    return (
      <StyledMenu
        ref={this.setMenuRef}
        button={<MenuButton press={this.showMenu} icon='more'/>}>

        <MenuItem onPress={this._themeLightPress}>Thème Blanc</MenuItem>
        <MenuItem onPress={this._themeDarkPress}>Thème Noir</MenuItem>
      </StyledMenu>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    themes: bindActionCreators(allTheActions.themes, dispatch)
  }
})

const mapStateToProps = state => ({
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuHome)
