import { Body, Card, CardItem, Left, Text, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { bindActionCreators } from 'redux'
import allTheActions from '../../actions'

const StyledCard = styled(Card)`
  background-color: ${props => props.theme.color.cards};
`

const StyledText = styled(Text)`
  color: ${props => props.theme.color.font};
`

const Title = styled(Text)`
  color: ${props => props.theme.color.font};
  font-weight: bold;
`

const RightCard = styled.View`
  align-items: center;
`

class VideoCard extends Component {
  static propTypes = {
    actions: PropTypes.object,
    navigation: PropTypes.object,
    playlist: PropTypes.object,
    theme: PropTypes.object,
    video: PropTypes.object
  }


  _videoPress = () => {
    const { actions, navigation, playlist, video } = this.props

    if (!playlist) navigation.goBack()

    actions.musics.createMusic({
      dislike: '0',
      link: video.id.videoId,
      playlist: playlist._id
    })
    navigation.goBack()
  }

  render() {
    const { video } = this.props
    const { thumbnails, title, channelTitle } = video.snippet

    return (
      <StyledCard>
        <TouchableOpacity onPress={this._videoPress}>
          <CardItem>
            <Left>
              <Thumbnail square large source={{ uri: thumbnails.medium.url }}/>
              <Body header>
              <Title>{title}</Title>
              <StyledText>{channelTitle}</StyledText>
              </Body>
            </Left>
          </CardItem>
        </TouchableOpacity>
      </StyledCard>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    musics: bindActionCreators(allTheActions.musics, dispatch)
  }
})

const mapStateToProps = state => ({
  playlist: state.playlists.currentPlaylist,
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoCard)
