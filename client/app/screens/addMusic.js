import { bindActionCreators } from 'redux'
import { Button, Form, Text } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import InputLabeled from '../components/inputLabeled'

import allTheActions from '../actions'

const BackgroundView = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.color.background};
  justify-content: center;
  align-items: center;
`

const Inputs = styled.View`
  width: 100%;
  margin-bottom: 40px;
`

const StyledButton = styled(Button)`
  background-color: ${props => props.theme.color.button};
`

class AddMusic extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    actions: PropTypes.object,
    playlist: PropTypes.object,
    theme: PropTypes.object
  }

  state = {
    link: ''
  }

  _validAdding = () => {
    const { actions, navigation, playlist } = this.props
    const { link } = this.state

    if (!playlist) navigation.goBack()

    actions.musics.createMusic({
      link,
      playlist: playlist._id,
      dislike: '0'
    })
    navigation.goBack()
  }

  render() {
    return (
      <BackgroundView>
        <Inputs>
          <Form>
            <InputLabeled label='Lien Youtube' icon='link'
                          onChange={link => this.setState({ link })}/>
          </Form>
        </Inputs>

        <StyledButton block onPress={this._validAdding}>
          <Text>Ajouter</Text>
        </StyledButton>
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
  playlist: state.playlists.currentPlaylist,
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMusic)
