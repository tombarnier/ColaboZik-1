import { Icon, Input, Item } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

const BackgroundInput = styled.View`
  background-color: ${props => props.theme.color.cards};
  margin-top: 10px;
`

export default class InputLabeled extends Component {
  static propTypes = {
    androidIcon: PropTypes.string,
    icon: PropTypes.string,
    iosIcon: PropTypes.string,
    isPassword: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
  }

  render() {
    const { androidIcon, icon, iosIcon, isPassword, label, onChange, onSubmit } = this.props

    return (
      <BackgroundInput>
        <Item regular>
          <Icon active name={icon} android={androidIcon} ios={iosIcon}/>
          <Input placeholder={label}
                 secureTextEntry={isPassword}
                 onChangeText={onChange}
                 onSubmitEditing={onSubmit}/>
        </Item>
      </BackgroundInput>
    )
  }
}
