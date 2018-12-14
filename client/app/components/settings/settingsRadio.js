import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { CardItem, Left, Radio, Right, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'

const StyledCardItem = styled(CardItem)`
  background-color: ${props => props.theme.color.foreground};
  border-color: ${props => props.theme.color.border};
`

const StyledText = styled(Text)`
  color: ${props => props.theme.color.text};
`

export default class SettingsRadio extends Component {
  static propTypes = {
    isSelected: PropTypes.bool,
    onPress: PropTypes.func,
    text: PropTypes.string
  }

  render() {
    const { isSelected, onPress, text } = this.props

    return (
      <TouchableOpacity onPress={onPress}>
        <StyledCardItem>
          <Left>
            <StyledText>{text}</StyledText>
          </Left>
          <Right>
            <Radio selected={isSelected}/>
          </Right>
        </StyledCardItem>
      </TouchableOpacity>
    )
  }
}
