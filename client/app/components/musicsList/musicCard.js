import { Body, Button, Card, CardItem, Icon, Left, Text, Thumbnail } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import allTheActions from '../../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


const RightCard = styled.View`
  align-items: center;
`

class MusicCard extends Component {
  static propTypes = {
    music: PropTypes.object,
    actions: PropTypes.object
  }

  delete = (music) => {
    this.props.actions.musics.deleteMusic(music)
  }
  downVote = (music) => {
    this.props.actions.musics.downvoteMusic(music)
  }
  render() {
    const { title, thumbnail, dislike, _id } = this.props.music
    dislike ? dislike : 0

    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail square large source={{ uri: thumbnail }}/>
            <Body header>
              <Text>{title}</Text>
            </Body>
          </Left>

          <RightCard>
            <Button danger transparent>
              <TouchableOpacity onPress={() => this.downVote(this.props.music)}>
                <Icon name='thumbs-down'/>
              </TouchableOpacity>
            </Button>
            <Button danger transparent>
              <TouchableOpacity  onPress={() => this.delete(_id)}>
                <Icon name='thumbs-up'/>
              </TouchableOpacity>
            </Button>
            <Text style={{ color: dislike < 0 ? 'red' : 'black' }}>{dislike}</Text>
          </RightCard>
        </CardItem>
      </Card>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  actions: {
    musics: bindActionCreators(allTheActions.musics, dispatch)
  }
})

const mapStateToProps = state => {
  return state
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicCard)
