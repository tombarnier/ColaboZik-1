import React, {Component} from 'react'
import {View} from 'react-native'
import {Form, Button, Text} from 'native-base'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import allTheActions from '../actions'

import InputLabeled from '../components/inputLabeled'

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
    const { actions, user } = this.props
    const { name, tags } = this.state
    actions.playlists.createPlaylist({
      name,
      tags,
      members: [user._id]
    })
    this.props.navigation.goBack()
  }

  render() {
    const {navigation} = this.props

    return (
      <BackgroundView>
        <Inputs>
          <Form>
            <InputLabeled label='Nom'
                          onChange={name => this.setState({name})}/>
            <InputLabeled label='Tags'
                          onChange={tags => this.setState({tags})}/>
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
