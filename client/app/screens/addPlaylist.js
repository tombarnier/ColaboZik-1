import React, {Component} from 'react'
import {View} from 'react-native'
import {Form, Button, Text} from 'native-base'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import InputLabeled from '../components/inputLabeled'

const BackgroundView = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.color.secondary};
  justify-content: center;
  align-items: center;
`

const Inputs = styled.View`
  width: 100%;
  margin-bottom: 40px;
`

export default class AddPlaylist extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  state = {
    name: '',
    tags: ''
  }

  _validLink = () => {
    alert(`creation salon : ${this.state.name}`)
    this.props.navigation.goBack()
  }

  render() {
    const {navigation} = this.props

    return (
      <BackgroundView>
        <Inputs>
          <Form>
            <InputLabeled label='Nom'
                          onChange={name => this.setState({name})}/>
            <InputLabeled label='Tags'
                          onChange={tags => this.setState({tags})}/>
          </Form>
        </Inputs>
        <Button block success onPress={this._validLink}>
          <Text>Ajouter</Text>
        </Button>
      </BackgroundView>
    )
  }
}
