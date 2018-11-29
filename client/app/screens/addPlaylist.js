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

class AddPlaylist extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    actions: PropTypes.object,
    user: PropTypes.object,
    theme: PropTypes.object
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
    const { theme } = this.props

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
    playlists: bindActionCreators(allTheActions.playlists, dispatch)
  }
})

const mapStateToProps = state => ({
  user: state.feathers.user,
  theme: state.themes.currentTheme
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPlaylist)
