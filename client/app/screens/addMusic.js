import { Button, Form, Text } from 'native-base'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'

import InputLabeled from '../components/inputLabeled'

import allTheActions from '../actions'

const BackgroundView = styled.View`
  flex: 1;
  padding: 10px;
  background-color: ${props => props.theme.color.secondary};
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
    actions: PropTypes.object
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
    return (
      <BackgroundView>
        <Inputs>
          <Form>
            <InputLabeled label='Lien Youtube' icon='link'
                          onChange={link => this.setState({ link })}/>
          </Form>
        </Inputs>

        <Button block success onPress={this._validAdding}>
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

const mapStateToProps = state => {
  return state
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMusic)
