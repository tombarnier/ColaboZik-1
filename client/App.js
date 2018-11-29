import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'

import StackNavigator from './app/config/routes'
import { store } from './app/config/store'


type Props = {}
export default class App extends Component {
  state = {
    connectedTheme: store.getState('themes')
  }

  componentDidMount () {
    store.subscribe(() =>
      this.setState({ connectedTheme: store.getState('themes') })
    )
  }

  render () {
    const { connectedTheme } = this.state
    return (
      <Provider store={store}>
        <ThemeProvider theme={connectedTheme.themes.currentTheme}>
          <StackNavigator/>
        </ThemeProvider>
      </Provider>
    )
  }
}
