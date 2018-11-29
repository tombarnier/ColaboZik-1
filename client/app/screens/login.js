import { bindActionCreators } from 'redux'
import { Button, Form, H1, Text } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import allTheActions from '../actions'
import InputLabeled from '../components/inputLabeled'

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

class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    actions: PropTypes.object
  }

  state = {
    email: '',
    password: ''
  }

  submit = () => {
    const { email, password } = this.state
    const { navigation, actions } = this.props
    actions.feathers.login(email, password).then((authenticated) => {
      if (authenticated === true) navigation.navigate('Home')
      else window.alert('Invalid credentials')
    })
  }

  render() {
    const { theme } = this.props
    
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

        <Button block style={{backgroundColor: theme.color.button }} onPress={this.submit}>
          <Text>Se connecter</Text>
        </Button>
      </BackgroundView>
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
    user: state.feathers.user,
    theme: state.themes.currentTheme
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
