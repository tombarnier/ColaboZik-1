import { ActivityIndicator, AsyncStorage, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import allTheActions from '../actions'

const AuthLoadingContainer = styled.View`
  background-color: ${props => props.theme.color.secondary};
  flex: 1;
  justify-content: center;
  align-items: center;
`

class AuthLoading extends React.Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  componentDidMount() {
    const { actions, navigation } = this.props
    actions.auth.reauthenticate().then((authenticated) => {
      navigation.navigate(authenticated ? 'Connected' : 'Disconnected')
    })
  }

  render() {
    return (
      <AuthLoadingContainer>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </AuthLoadingContainer>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  actions: {
    auth: bindActionCreators(allTheActions.auth, dispatch)
  }
})

const mapStateToProps = state => {
  return {
    accessToken: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoading)
