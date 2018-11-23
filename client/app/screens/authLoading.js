import {ActivityIndicator, AsyncStorage, StatusBar} from 'react-native'
import {H1, Spinner} from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import allTheActions from '../actions'
import {displayName as appName} from '../../app.json'

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
    const {actions, navigation} = this.props
    actions.feathers.reauthenticate().then((authenticated) => {
      navigation.navigate(authenticated ? 'Connected' : 'Disconnected')
    })
  }

  render() {
    return (
      <AuthLoadingContainer>
        <H1>{appName}</H1>
        <Spinner color='blue'/>
        <StatusBar barStyle="default"/>
      </AuthLoadingContainer>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  actions: {
    feathers: bindActionCreators(allTheActions.feathers, dispatch)
  }
})

const mapStateToProps = state => {
  return {
    user: state.feathers.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoading)
