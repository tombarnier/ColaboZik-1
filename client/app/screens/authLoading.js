import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { H1, Spinner } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import { displayName as appName } from '../../app.json'
import allTheActions from '../actions'

const AuthLoadingContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.background};
  justify-content: center;
  align-items: center;
`

class AuthLoading extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
    actions: PropTypes.object
  }

  componentDidMount() {
    const { actions, navigation } = this.props

    actions.feathers.reauthenticate().then((authenticated) => {
      navigation.navigate(authenticated ? 'Connected' : 'Disconnected')
    })
  }

  render() {
    return (
      <AuthLoadingContainer>
        <H1>{appName}</H1>
        <Spinner color='blue'/>
      </AuthLoadingContainer>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  actions: {
    feathers: bindActionCreators(allTheActions.feathers, dispatch)
  }
})

const mapStateToProps = state => ({
  user: state.feathers.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoading)
