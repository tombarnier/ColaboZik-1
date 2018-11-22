import React, {Component} from 'react'
import {Input, Item, Label} from 'native-base'
import PropTypes from 'prop-types'

export default class InputLabeled extends Component {
  static propTypes = {
    label: PropTypes.string,
    isPassword: PropTypes.bool,
    onChange: PropTypes.func
  }

  render() {
    const {label, isPassword, onChange} = this.props
    return (
      <Item floatingLabel>
        <Label>{label}</Label>
        <Input secureTextEntry={isPassword} onChangeText={onChange}/>
      </Item>
    )
  }
}
