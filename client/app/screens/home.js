import React, {Component} from 'react'
import {View, TouchableOpacity} from 'react-native'
import {Button, Form, H1, Input, Item, Label, Text, Textarea} from 'native-base'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import allTheActions from '../actions'

const BackgroundView = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.color.secondary};
  justify-content: center;
  align-items: center;
`

const Inputs = styled.View`
  width: 100%;
  margin: 40px 0;
`

const ParameterTouchableOpacity = styled.TouchableOpacity`
  border: 5px solid black;
  width: 200px;
`

const TextBouton = styled.Text`
   justify-content: center;
`

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  submit = () => {
    const { emailValue, passValue } = this.state
  }
  render() {
    const {navigation} = this.props

    return (
      <BackgroundView>
        <H1>Connection</H1>

        <Inputs>
          <Form>
            <Item floatingLabel>
              <Label>Pseudo</Label>
              <Input/>
            </Item>
            <Item floatingLabel>
              <Label>Mot de passe</Label>
              <Input secureTextEntry={true}/>
            </Item>
          </Form>
        </Inputs>

        <Button block info onPress={() => navigation.navigate('authLoading')}>
          <Text>Se connecter</Text>
        </Button>

      </BackgroundView>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    auth: bindActionCreators(allTheActions.auth,dispatch)
  }
})

const mapStateToProps = state => {
  return {
    accessToken: state.user.accessToken
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
