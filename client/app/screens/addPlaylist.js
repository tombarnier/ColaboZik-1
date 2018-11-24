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

class AddPlaylist extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  state = {
    name: '',
    tags: ''
  }

  _validLink = () => {
    const { actions, user, navigation } = this.props
    const { name, tags } = this.state
    actions.playlists.createPlaylist({
      name,
      tags,
      members: [user._id]
    })
    navigation.goBack()
  }

  render() {
    const { navigation } = this.props

    return (
      <BackgroundView>
        <Inputs>
          <Form>
            <InputLabeled label='Nom'
                          onChange={name => this.setState({ name })}/>
            <InputLabeled label='Tags'
                          onChange={tags => this.setState({ tags })}/>
          </Form>
        </Inputs>
        <Button block success onPress={this._validLink}>
          <Text>Ajouter</Text>
        </Button>
      </BackgroundView>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: {
    playlists: bindActionCreators(allTheActions.playlists, dispatch),
  }
})

const mapStateToProps = state => {
  return {
    user: state.feathers.user,
    playlists: state.playlists.playlists
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPlaylist)
