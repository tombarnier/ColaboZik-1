import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

const BackgroundView = styled.View`
  flex: 1;
`

const ContentContainer = styled.View`
  background-color: ${props => props.theme.color.primary};
  flex: 5;
  justify-content: center;
  align-items: center;
`
const ParameterTouchableOpacity = styled.TouchableOpacity`
  border: 5px solid black;
  width: 200px;
`

const TextBouton = styled.Text`
   justify-content: center;
`

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object
  }

  render() {
    return (
      <BackgroundView>
        <ContentContainer>
          <ParameterTouchableOpacity>
            <TextBouton>Test</TextBouton>
          </ParameterTouchableOpacity>
        </ContentContainer>
      </BackgroundView>
    )
  }
}
