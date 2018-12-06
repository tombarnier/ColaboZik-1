import { bindActionCreators } from 'redux'
import { Button, Form, H1, Text } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import InputLabeled from '../components/inputLabeled'

import allTheActions from '../actions'

const BackgroundView = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.color.background};
  justify-content: center;
  align-items: center;
`

const Inputs = styled.View`
  width: 100%;
  margin: 40px 0;
`

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.color.button};
`

class Login extends Component {
  static propTypes = {
    actions: PropTypes.object,
    navigation: PropTypes.object,
    theme: PropTypes.object
  }

  state = {
    email: '',
    password: ''
  }

  submit = () => {
    const { email, password } = this.state
    const { actions, navigation } = this.props

    // Try to authenticate using form credentials
    actions.feathers.login(email, password).then((authenticated) => {
      if (authenticated) navigation.navigate('Home')
      else alert('Invalid credentials')
    })
  }

  render() {
    return (
      <BackgroundView>
        <H1>Connexion</H1>

        <Inputs>
          <Form>
            <InputLabeled label='Adresse email' icon='mail'
                          onChange={email => this.setState({ email })}/>
            <InputLabeled label='Mot de passe' icon='lock'
                          isPassword
                          onChange={password => this.setState({ password })}/>
          </Form>
        </Inputs>

        <StyledButton block onPress={this.submit}>
          <Text>Se connecter</Text>
        </StyledButton>
      </BackgroundView>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    feathers: bindActionCreators(allTheActions.feathers, dispatch)
  }
})

const mapStateToProps = state => ({
  theme: state.themes.currentTheme,
  user: state.feathers.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
