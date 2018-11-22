import { Provider } from 'react-redux'
import React, {Component} from 'react'
import {ThemeProvider} from 'styled-components'
import StackNavigator from './app/config/routes'
import { store } from './app/config/store'


type Props = {}
export default class App extends Component<Props> {
  render() {
    let currentTheme = {
      color: {
        primary: 'red',
        secondary: 'purple'
      }
    }
    return (
      <Provider store={store}>
        <ThemeProvider theme={currentTheme}>
          <StackNavigator />
        </ThemeProvider>
      </Provider>
    )
  }
}
