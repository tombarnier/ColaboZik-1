import { AsyncStorage } from 'react-native'
import { bindActionCreators } from 'redux'
import { Card, CardItem, Icon, Text } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import { themeDark, themeLight } from '../../config/themes'
import allTheActions from '../../actions'
import SettingsRadio from './settingsRadio'

const StyledCard = styled(Card)`
  background-color: ${props => props.theme.color.foreground};
  border-color: ${props => props.theme.color.border};
`
const StyledCardItem = styled(CardItem)`
  background-color: ${props => props.theme.color.foreground};
  border-color: ${props => props.theme.color.border};
`

const StyledText = styled(Text)`
  color: ${props => props.theme.color.text};
`

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.color.text};
`

class SettingsThemes extends Component {
  static propTypes = {
    actions: PropTypes.object,
    theme: PropTypes.object
  }

  state = {
    isDark: null,
    isLight: null
  }

  componentDidMount() {
    const { theme } = this.props

    this.setState({
      isDark: this._isDark(theme),
      isLight: this._isLight(theme)
    })
  }

  _changeTheme = (theme) => {
    const { actions } = this.props

    actions.themes.changeTheme(theme)
    AsyncStorage.setItem('currentTheme', theme.name)
    this.setState({
      isDark: this._isDark(theme),
      isLight: this._isLight(theme)
    })
  }
  _themeDarkPress = () => this._changeTheme(themeDark)
  _themeLightPress = () => this._changeTheme(themeLight)

  _isLight = (theme) => theme === themeLight
  _isDark = (theme) => theme === themeDark

  render() {
    const { isDark, isLight } = this.state

    return (
      <StyledCard>
        <StyledCardItem header bordered>
          <StyledIcon active name='color-lens'
                      android='md-color-palette'
                      ios='ios-color-palette'/>
          <StyledText>Thèmes</StyledText>
        </StyledCardItem>
        <SettingsRadio isSelected={isLight}
                       onPress={this._themeLightPress}
                       text='Light'/>
        <SettingsRadio isSelected={isDark}
                       onPress={this._themeDarkPress}
                       text='Dark'/>
      </StyledCard>
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
)(SettingsThemes)
