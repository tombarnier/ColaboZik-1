import { Button, Icon } from 'native-base'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

const AlignCenter = styled.View`
  align-items: center;
`

const StyledIcon = styled(Icon)`
  color: ${props => props.theme.color.text};
`

export default class MenuButton extends Component {
  static propTypes = {
    androidIcon: PropTypes.string,
    icon: PropTypes.string,
    iosIcon: PropTypes.string,
    press: PropTypes.func
  }

  render() {
    const { androidIcon, icon, iosIcon, press } = this.props

    return (
      <AlignCenter>
        <Button transparent>
          <TouchableOpacity onPress={press}>
            <StyledIcon name={icon} android={androidIcon} ios={iosIcon}/>
          </TouchableOpacity>
        </Button>
      </AlignCenter>
    )
  }
}
