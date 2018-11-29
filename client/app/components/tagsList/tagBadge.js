import { Badge, Text } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

class TagBadge extends Component {
  static propTypes = {
    theme: PropTypes.object,
    tag: PropTypes.string
  }

  render() {
    const { tag, theme } = this.props
    return (
      <Badge style={{ marginRight: 4, marginBottom: 4, backgroundColor: theme.color.tags }}>
        <Text>{tag}</Text>
      </Badge>
    )
  }
}

const mapStateToProps = state => {
  return {
    theme: state.themes.currentTheme
  }
}

export default connect(
  mapStateToProps
)(TagBadge)
