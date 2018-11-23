import React, {Component} from 'react'
import {Input, Item, Label, Icon} from 'native-base'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const BackgroundInput = styled.View`
  background-color: ${props => props.theme.color.primary};
  margin-top: 10px;
`

export default class InputLabeled extends Component {
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    isPassword: PropTypes.bool,
    onChange: PropTypes.func
  }

  render() {
    const {label, icon, isPassword, onChange} = this.props
    return (
      <BackgroundInput>
        <Item regular>
          <Icon active name={icon}/>
          <Input placeholder={label}
                 secureTextEntry={isPassword}
                 onChangeText={onChange}/>
        </Item>
      </BackgroundInput>
    )
  }
}
