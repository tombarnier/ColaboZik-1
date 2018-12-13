import { Body, Card, CardItem, Left, Text, Thumbnail } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import DislikeButton from './dislikeButton'

const StyledCard = styled(Card)`
  background-color: ${props => props.theme.color.foreground};
  border-color: ${props => props.theme.color.border};
`

const StyledCardItem = styled(CardItem)`
  background-color: ${props => props.theme.color.foreground};
  border-color: ${props => props.theme.color.border};
`

const StyledText = styled(Text)`
  color: ${props => props.theme.color.text};
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
        <StyledCardItem>
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
                dislike.length > 0 ? theme.color.danger : theme.color.text
            }}>
              {dislike.length === 0 ? '0' : `-${dislike.length}`}
            </Text>
          </RightCard>
        </StyledCardItem>
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
