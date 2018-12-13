import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Fab, Icon } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import MusicPlayer from '../components/musicPlayer'

import allTheActions from '../actions'

const BackgroundView = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.background};
`

const TitleText = styled.Text`
  text-align: center;
  font-size: 18px;
  margin: 0px 100px;
  color: ${props => props.theme.color.text};
`

const StyledFab = styled(Fab)`
  background-color: ${props => props.theme.color.primary};
`

class Player extends Component {
  static propTypes = {
    actions: PropTypes.object,
    musics: PropTypes.array,
    navigation: PropTypes.object
  }

  state = {
    id: 0,
    title: '',
    url: ''
  }

  componentDidMount() {
    const { navigation, musics } = this.props

    if (musics.length === 0) {
      navigation.goBack()
      alert('Playlist vide !')
      return
    }

    this.setState({
      title: musics[0].title,
      url: musics[0].embed
    })
  }

  next = (direction) => {
    const { musics } = this.props
    const { id } = this.state
    let music

    if (direction === 'forward') {
      // go back to the first music if it was the last music
      if (id === musics.length - 1)
        music = musics[0]
      else
        music = musics[id + 1]
    } else if (direction === 'backward') {
      // go back to the last music if it was the first music
      if (id === 0)
        music = musics[musics.length - 1]
      else
        music = musics[id - 1]
    } else {
      alert('invalid direction')
      return
    }

    this.setState({
      id: musics.indexOf(music),
      title: music.title,
      url: music.embed
    })
  }

  forward = () => this.next('forward')
  backward = () => this.next('backward')

  render() {
    const { title, url } = this.state

    return (
      <BackgroundView>
        <MusicPlayer url={url} forward={this.forward}/>
        <View>
          <StyledFab position='topRight' onPress={this.forward}>
            <Icon name='skip-forward'/>
          </StyledFab>
          <StyledFab position='topLeft' onPress={this.backward}>
            <Icon name='skip-backward'/>
          </StyledFab>
          <TitleText>{title}</TitleText>
        </View>
      </BackgroundView>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    musics: bindActionCreators(allTheActions.musics, dispatch)
  }
})

const mapStateToProps = state => ({
  musics: state.musics.musics
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
