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
`

class Player extends Component {

  static propTypes = {
    navigation: PropTypes.object,
    theme: PropTypes.object,
    actions: PropTypes.object,
    musics: PropTypes.array
  }

  state = {
    id: 0,
    url: '',
    title: ''
  }

  componentDidMount() {
    const { navigation, musics } = this.props

    if (musics.length === 0) {
      navigation.goBack()
      alert('Playlist vide !')
      return
    }

    this.setState({
      url: musics[0].embed,
      title: musics[0].title
    })
  }

  next = (direction) => {
    const { id } = this.state
    const { musics } = this.props
    let music

    if (direction === 'forward') {
      if (id === musics.length - 1)
        music = musics[0]
      else
        music = musics[id + 1]
    } else if (direction === 'backward') {
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
      url: music.embed,
      title: music.title
    })
  }

  forward = () => this.next('forward')
  backward = () => this.next('backward')

  render() {
    const { theme } = this.props
    const { title, url } = this.state

    return (
      <BackgroundView>
        <MusicPlayer url={url} forward={this.forward}/>
        <View>
          <Fab
            style={{ backgroundColor: theme.color.button }}
            position='topRight'
            onPress={this.forward}>
            <Icon name='skip-forward'/>
          </Fab>
          <Fab
            style={{ backgroundColor: theme.color.button }}
            position='topLeft'
            onPress={this.backward}>
            <Icon name='skip-backward'/>
          </Fab>
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
  musics: state.musics.musics,
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Player)
