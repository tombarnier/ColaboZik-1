import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { H1, Spinner } from 'native-base'
import { AsyncStorage } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import StatusBarTranslucent from '../components/StatusBar'

import { displayName as appName } from '../../app.json'
import { themeDark, themeLight } from '../config/themes'
import allTheActions from '../actions'

const AuthLoadingContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.background};
  justify-content: center;
  align-items: center;
`

const Title = styled(H1)`
  color: ${props => props.theme.color.text};
`

class AuthLoading extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    navigation: PropTypes.object,
    theme: PropTypes.object
  }

  componentDidMount() {
    const { actions, navigation } = this.props

    AsyncStorage.getItem('currentTheme').then(themeName => {
      // Apply theme if is stored
      if (themeName === 'Light') actions.themes.changeTheme(themeLight)
      else if (themeName === 'Dark') actions.themes.changeTheme(themeDark)
      // Try to reauthenticate using stored JWT
      actions.feathers.reauthenticate().then(authenticated => {
        // Redirect user to login if not authenticated, else redirect to home
        navigation.navigate(authenticated ? 'Connected' : 'Disconnected')
      })
    })
  }

  render() {
    const { theme } = this.props

    return (
      <AuthLoadingContainer>
        {/*<StatusBarTranslucent/>*/}
        <Title>{appName}</Title>
        <Spinner color={theme.color.primary}/>
      </AuthLoadingContainer>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  actions: {
    feathers: bindActionCreators(allTheActions.feathers, dispatch),
    themes: bindActionCreators(allTheActions.themes, dispatch)
  }
})

const mapStateToProps = state => ({
  theme: state.themes.currentTheme,
  user: state.feathers.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoading)
