import { Badge, Text } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class TagBadge extends Component {
  static propTypes = {
    theme: PropTypes.object,
    tag: PropTypes.string
  }

  render() {
    const { tag, theme } = this.props

    return (
      <Badge style={{
        marginRight: 4,
        marginBottom: 4,
        backgroundColor: theme.color.tags
      }}>
        <Text>{tag}</Text>
      </Badge>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps
)(TagBadge)
