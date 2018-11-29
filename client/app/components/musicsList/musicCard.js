import { Body, Card, CardItem, Left, Text, Thumbnail } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import DislikeButton from './dislikeButton'

const RightCard = styled.View`
  align-items: center;
`

class MusicCard extends Component {
  static propTypes = {
    music: PropTypes.object,
    actions: PropTypes.object
  }

  render() {
    const { music, theme } = this.props
    const { title, thumbnail, dislike } = music

    return (
      <Card style={{ backgroundColor: theme.color.cards }}>
        <CardItem>
          <Left>
            <Thumbnail square large source={{ uri: thumbnail }}/>
            <Body header>
              <Text style={{ color: theme.color.font }}>{title}</Text>
            </Body>
          </Left>

          <RightCard>
            <DislikeButton music={music}/>
            <Text style={{ color: dislike.length > 0 ? 'red' : 'black' }}>{dislike.length}</Text>
          </RightCard>
        </CardItem>
      </Card>
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
)(MusicCard)
