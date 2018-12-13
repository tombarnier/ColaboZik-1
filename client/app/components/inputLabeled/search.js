import { Icon, Input, Item } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'

const BackgroundInput = styled.View`
  background-color: ${props => props.theme.color.foreground};
  border-color: ${props => props.theme.color.border};
  margin-top: 10px;
`

const StyledItem = styled(Item)`
  border-color: ${props => props.theme.color.border};
`

const StyledInput = styled(Input)`
  color: ${props => props.theme.color.text};  
`

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.color.text};  
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
        <StyledItem regular>
          <TouchableOpacity onPress={onSubmit}>
            <StyledIcon active name='search'/>
          </TouchableOpacity>
          <StyledInput ref={input => this.textInput = input}
                       autoFocus
                       placeholder={label}
                       secureTextEntry={isPassword}
                       onChangeText={this._getText}
                       onSubmitEditing={onSubmit}/>
          <TouchableOpacity onPress={this._clearText}>
            <StyledIcon active name='close'
                        style={{ display: text === '' ? 'none' : 'flex' }}/>
          </TouchableOpacity>
        </StyledItem>
      </BackgroundInput>
    )
  }
}
