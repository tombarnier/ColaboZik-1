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

class AddPlaylist extends Component {
  static propTypes = {
    actions: PropTypes.object,
    navigation: PropTypes.object,
    theme: PropTypes.object,
    user: PropTypes.object
  }

  state = {
    members: '',
    name: '',
    tags: ''
  }

  _validAdding = () => {
    const { actions, navigation, user } = this.props
    const { members, name, tags } = this.state

    actions.playlists.createPlaylist({
      members,
      name,
      owner: user.email,
      tags
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

        <StyledButton block onPress={this._validAdding}>
          <Text>Ajouter</Text>
        </StyledButton>
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
  theme: state.themes.currentTheme,
  user: state.feathers.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPlaylist)
