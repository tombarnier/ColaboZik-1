import React, { Component } from 'react'
import styled from 'styled-components'

import SettingsThemes from '../components/settings/settingsThemes'

const BackgroundView = styled.View`
  flex: 1;
  background-color: ${props => props.theme.color.background};
`

const ScrollSettings = styled.ScrollView`
  padding: 10px;
`

export default class Settings extends Component {
  render() {
    return (
      <BackgroundView>
        <ScrollSettings>
          <SettingsThemes/>
        </ScrollSettings>
      </BackgroundView>
    )
  }
}
