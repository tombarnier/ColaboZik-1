import { Icon, Input, Item } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

const BackgroundInput = styled.View`
  background-color: ${props => props.theme.color.cards};
  margin-top: 10px;
`

export default class InputSearch extends Component {
  static propTypes = {
    isPassword: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  }

  state = {
    text: ''
  }

  textInput = null
  _clearText = () => {
    this.textInput._root.clear()
    this.setState({ text: '' })
  }

  _getText = (text) => {
    const { onChange } = this.props

    this.setState({ text })
    onChange(text)
  }

  render() {
    const { isPassword, label, onSubmit } = this.props
    const { text } = this.state

    return (
      <BackgroundInput>
        <Item regular>
          <TouchableOpacity onPress={onSubmit}>
            <Icon active name='search'/>
          </TouchableOpacity>
          <Input ref={input => this.textInput = input}
                 autoFocus
                 placeholder={label}
                 secureTextEntry={isPassword}
                 onChangeText={this._getText}
                 onSubmitEditing={onSubmit}/>
          <TouchableOpacity onPress={this._clearText}>
            <Icon active name='close'
                  style={{ display: text === '' ? 'none' : 'flex' }}/>
          </TouchableOpacity>
        </Item>
      </BackgroundInput>
    )
  }
}
