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

const RightCard = styled.View`
  align-items: center;
`

class MusicCard extends Component {
  static propTypes = {
    music: PropTypes.object,
    theme: PropTypes.object
  }

  render() {
    const { music, theme } = this.props
    const { dislike, thumbnail, title } = music

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
            <Text style={{
              color:
                dislike.length > 0 ? 'red' : theme.color.font
            }}>
              {dislike.length === 0 ? '0' : `-${dislike.length}`}
            </Text>
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
