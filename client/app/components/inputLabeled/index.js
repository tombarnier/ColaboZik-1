import { Icon, Input, Item } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

const BackgroundInput = styled.View`
  background-color: ${props => props.theme.color.background};
  margin-top: 10px;
`

export default class InputLabeled extends Component {
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
    androidIcon: PropTypes.string,
    iosIcon: PropTypes.string,
    isPassword: PropTypes.bool,
    onChange: PropTypes.func
  }

  render() {
    const { label, icon, androidIcon, iosIcon, isPassword, onChange } = this.props
    return (
      <BackgroundInput>
        <Item regular>
          <Icon active name={icon} android={androidIcon} ios={iosIcon}/>
          <Input placeholder={label}
                 secureTextEntry={isPassword}
                 onChangeText={onChange}/>
        </Item>
      </BackgroundInput>
    )
  }
}
