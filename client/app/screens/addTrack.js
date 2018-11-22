import React, {Component} from 'react'
import {View} from 'react-native'
import {H1, Form, Item, Label, Input, Text, Button} from 'native-base'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components'

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

class AddTrack extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  state = {
    url: ''
  }

  _validLink = () => {
    alert(`creation piste : ${this.state.url}`)
    this.props.navigation.goBack()
  }

  render() {
    const {navigation} = this.props

    return (
      <BackgroundView>
        <Inputs>
          <Form>
            <Item floatingLabel>
              <Label>Lien Youtube</Label>
              <Input onChangeText={url => this.setState({url: url})}/>
            </Item>
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
    // tracks: bindActionCreators(allTheActions.tracks, dispatch)
  }
})

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTrack)