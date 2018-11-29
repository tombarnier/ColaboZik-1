import { Card, CardItem, Text } from 'native-base'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import TagsList from '../tagsList'

class PlaylistCard extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    playlist: PropTypes.object,
    theme: PropTypes.object
  }

  render() {
    const { navigation, playlist, theme } = this.props
    const { name, tags } = playlist

    return (
      <Card style={{ backgroundColor: theme.color.cards }}>
        <TouchableOpacity onPress={() => navigation.navigate('Playlist', { playlist })}>
          <CardItem header bordered>
            <Text style={{ color: theme.color.font }}>{name}</Text>
          </CardItem>

          <CardItem bordered>
            <TagsList tags={tags}/>
          </CardItem>
        </TouchableOpacity>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps
)(PlaylistCard)
