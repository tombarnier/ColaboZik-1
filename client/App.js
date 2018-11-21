import { Provider } from 'react-redux'
import React, {Component} from 'react'

import StackNavigator from './app/config/routes'
import { store } from './app/config/store'

type Props = {}
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <StackNavigator />
      </Provider>
    )
  }
}
