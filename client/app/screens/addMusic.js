import { bindActionCreators } from 'redux'
import { Button, Form, Text } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

import allTheActions from '../actions'
import InputLabeled from '../components/inputLabeled'

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

class AddMusic extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    actions: PropTypes.object,
    theme: PropTypes.object
  }

  state = {
    link: ''
  }

  _validAdding = () => {
    const { actions, navigation } = this.props
    const { link } = this.state
    const playlist = navigation.getParam('playlist', undefined)

    if (!playlist) navigation.goBack()

    actions.musics.createMusic({
      link,
      playlist: playlist._id,
      dislike: '0'
    })
    navigation.goBack()
  }

  render() {
    const { theme } = this.props

    return (
      <BackgroundView>
        <Inputs>
          <Form>
            <InputLabeled label='Lien Youtube' icon='link'
                          onChange={link => this.setState({ link })}/>
          </Form>
        </Inputs>

        <Button block style={{ backgroundColor: theme.color.button }}
                onPress={this._validAdding}>
          <Text>Ajouter</Text>
        </Button>
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
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMusic)
