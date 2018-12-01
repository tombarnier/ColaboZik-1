import { Card, CardItem, Text } from 'native-base'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import TagsList from '../tagsList'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  background-color: ${props => props.theme.color.cards};
`

const StyledText = styled(Text)`
  color: ${props => props.theme.color.font};
`

class PlaylistCard extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    playlist: PropTypes.object,
    theme: PropTypes.object
  }

  _playlistPress = () => {
    const { playlist, navigation } = this.props

    navigation.navigate('Playlist', { playlist })
  }

  render() {
    const { playlist } = this.props
    const { name, tags } = playlist

    return (
      <StyledCard>
        <TouchableOpacity onPress={this._playlistPress}>
          <CardItem header bordered>
            <StyledText>{name}</StyledText>
          </CardItem>

          <CardItem bordered>
            <TagsList tags={tags}/>
          </CardItem>
        </TouchableOpacity>
      </StyledCard>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps
)(PlaylistCard)
