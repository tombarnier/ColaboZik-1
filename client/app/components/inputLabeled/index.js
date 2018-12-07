import { Icon, Input, Item } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

const BackgroundInput = styled.View`
  background-color: ${props => props.theme.color.cards};
  border-color: ${props => props.theme.color.border};
  margin-top: 10px;
`

const StyledItem = styled(Item)`
  border-color: ${props => props.theme.color.border};
`

const StyledInput = styled(Input)`
  color: ${props => props.theme.color.font};  
`

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.color.font};  
`

export default class InputLabeled extends Component {
  static propTypes = {
    androidIcon: PropTypes.string,
    icon: PropTypes.string,
    iosIcon: PropTypes.string,
    isPassword: PropTypes.bool,
    label: PropTypes.string,
    onChange: PropTypes.func
  }

  render() {
    const { androidIcon, icon, iosIcon, isPassword, label, onChange } = this.props

    return (
      <BackgroundInput>
        <StyledItem regular>
          <StyledIcon active name={icon} android={androidIcon} ios={iosIcon}/>
          <StyledInput placeholder={label}
                 secureTextEntry={isPassword}
                 onChangeText={onChange}/>
        </StyledItem>
      </BackgroundInput>
    )
  }
}
