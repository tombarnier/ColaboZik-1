import { Body, Card, CardItem, Left, Text, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import DislikeButton from './dislikeButton'

const StyledCard = styled(Card)`
  background-color: ${props => props.theme.color.cards};
`

const StyledText = styled(Text)`
  color: ${props => props.theme.color.font};
`

const Counter = styled(Text)`
  color: ${props => props.music.dislike.length > 0 ? 'red' : props.theme.color.font };
`

const RightCard = styled.View`
  align-items: center;
`

class MusicCard extends Component {
  static propTypes = {
    music: PropTypes.object,
    theme: PropTypes.object
  }

  _dislikeCounter = () => {
    const { dislike } = this.props.music

    return dislike.length === 0 ? '0' : `-${dislike.length}`
  }

  render() {
    const { music } = this.props
    const { title, thumbnail } = music

    return (
      <StyledCard>
        <CardItem>
          <Left>
            <Thumbnail square large source={{ uri: thumbnail }}/>
            <Body header>
              <StyledText>{title}</StyledText>
            </Body>
          </Left>

          <RightCard>
            <DislikeButton music={music}/>
            <Counter>{this._dislikeCounter}</Counter>
          </RightCard>
        </CardItem>
      </StyledCard>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps
)(MusicCard)
