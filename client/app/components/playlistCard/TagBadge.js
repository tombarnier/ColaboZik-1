import React, {Component} from 'react'
import {Text, Badge} from 'native-base'
import PropTypes from 'prop-types'

export default class TagBadge extends Component {
  static propTypes = {
    tag: PropTypes.string
  }

  render() {
    const {tag} = this.props
    return (
      <Badge warning style={{marginRight: 4, marginBottom: 4}}>
        <Text>{tag}</Text>
      </Badge>
    )
  }
}
