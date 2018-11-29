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
    navigation: PropTypes.object,
    actions: PropTypes.object,
    user: PropTypes.object
  }

  state = {
    name: '',
    tags: '',
    members: ''
  }

  _validAdding = () => {
    const { actions, user, navigation } = this.props
    const { name, tags, members } = this.state

    actions.playlists.createPlaylist({
      name,
      tags,
      members,
      owner: user.email
    })
    navigation.goBack()
  }

  render() {
    return (
      <BackgroundView>
        <Inputs>
          <Form>
            <InputLabeled label='Nom'
                          onChange={name => this.setState({ name })}/>
            <InputLabeled label='Tags' icon='tags'
                          androidIcon='md-pricetags' iosIcon='ios-pricetags'
                          onChange={tags => this.setState({ tags })}/>
            <InputLabeled label='Members' icon='tags'
                          androidIcon='md-pricetags' iosIcon='ios-pricetags'
                          onChange={members => this.setState({ members })}/>
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
    playlists: bindActionCreators(allTheActions.playlists, dispatch),
  }
})

const mapStateToProps = state => {
  return {
    user: state.feathers.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPlaylist)
