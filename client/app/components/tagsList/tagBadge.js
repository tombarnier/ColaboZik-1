import { Badge, Text } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

const StyledBadge = styled(Badge)`
  background-color: ${props => props.theme.color.secondary};
  margin: 0 4px 4px 0;
`

export default class TagBadge extends Component {
  static propTypes = {
    tag: PropTypes.string
  }

  render() {
    const { tag } = this.props

    return (
      <StyledBadge>
        <Text>{tag}</Text>
      </StyledBadge>
    )
  }
}
