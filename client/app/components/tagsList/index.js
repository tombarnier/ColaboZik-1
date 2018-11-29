import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import TagBadge from '../tagsList/tagBadge'

const HorizontalList = styled.FlatList`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`

export default class TagsList extends Component {
  static propTypes = {
    tags: PropTypes.array
  }

  _tagBadge = ({ item }) => <TagBadge tag={item}/>

  _tagKey = (item) => item

  render() {
    const { tags } = this.props

    return (
      <HorizontalList data={tags}
                      renderItem={this._tagBadge}
                      keyExtractor={this._tagKey}/>
    )
  }
}
