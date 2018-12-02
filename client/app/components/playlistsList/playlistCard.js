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
const StyledCardItem = styled(CardItem)`
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
    const { navigation, playlist } = this.props

    navigation.navigate('Playlist', { playlist })
  }

  render() {
    const { playlist } = this.props
    const { name, tags } = playlist

    return (
      <StyledCard>
        <TouchableOpacity onPress={this._playlistPress}>
          <StyledCardItem header bordered>
            <StyledText>{name}</StyledText>
          </StyledCardItem>

          <StyledCardItem bordered>
            <TagsList tags={tags}/>
          </StyledCardItem>
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
