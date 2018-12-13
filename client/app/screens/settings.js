import { Card, CardItem, Icon, Left, Radio, Right, Text } from 'native-base'
import { AsyncStorage, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import allTheActions from '../actions'
import { connect } from 'react-redux'
import { themeDark, themeLight } from '../config/themes'

const BackgroundView = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.background};
`

const ScrollSettings = styled.ScrollView`
  padding: 10px;
`

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

class Settings extends Component {
  static propTypes = {
    actions: PropTypes.object,
    navigation: PropTypes.object,
    theme: PropTypes.object
  }

  state = {
    isDark: null,
    isLight: null
  }

  componentDidMount() {
    const { theme } = this.props

    this.setState({ isDark: this._isDark(theme), isLight: this._isLight(theme) })
  }

  _changeTheme = (theme) => {
    const { actions, navigation } = this.props

    actions.themes.changeTheme(theme)
    AsyncStorage.setItem('currentTheme', theme.name)
    this.setState({ isDark: this._isDark(theme), isLight: this._isLight(theme) })
  }
  _themeDarkPress = () => this._changeTheme(themeDark)
  _themeLightPress = () => this._changeTheme(themeLight)

  _isLight = (theme) => theme === themeLight
  _isDark = (theme) => theme === themeDark

  render() {
    const { isDark, isLight } = this.state

    return (
      <BackgroundView>
        <ScrollSettings>
          <StyledCard>
            <StyledCardItem header bordered>
              <StyledIcon active name='color-lens' android='md-color-palette' ios='ios-color-palette'/>
              <StyledText>Thèmes</StyledText>
            </StyledCardItem>
            <TouchableOpacity onPress={this._themeLightPress}>
              <StyledCardItem>
                <Left>
                  <StyledText>Light</StyledText>
                </Left>
                <Right>
                  <Radio selected={isLight}/>
                </Right>
              </StyledCardItem>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._themeDarkPress}>
              <StyledCardItem>
                <Left>
                  <StyledText>Dark</StyledText>
                </Left>
                <Right>
                  <Radio selected={isDark}/>
                </Right>
              </StyledCardItem>
            </TouchableOpacity>
          </StyledCard>
        </ScrollSettings>
      </BackgroundView>
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
)(Settings)
