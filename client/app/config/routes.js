import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import React from 'react'
import { StatusBar } from 'react-native'

import { displayName as appName } from '../../app.json'
import { store } from '../config/store'

import AddMusic from '../screens/addMusic'
import AddPlaylist from '../screens/addPlaylist'
import AuthLoading from '../screens/authLoading'
import Home from '../screens/home'
import Login from '../screens/login'
import Player from '../screens/player'
import Playlist from '../screens/playlist'


const optionsGeneral = {
  headerMode: 'none'
}

const optionsColor = {
  navigationOptions: ({ navigation }) => {
    const { color } = store.getState('themes').themes.currentTheme
    return {
      headerStyle: {
        backgroundColor: color.foreground,
        height: 80,
        paddingTop: 24
      },
      headerTintColor: color.text
    }
  }
}

const LoggedUser = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: appName
      }
    },
    AddPlaylist: {
      screen: AddPlaylist,
      navigationOptions: {
        title: 'Ajouter une playlist'
      }
    },
    Playlist: {
      screen: Playlist,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam('playlist', { name: 'Playlist' }).name
      })
    },
    AddMusic: {
      screen: AddMusic,
      navigationOptions: {
        title: 'Ajouter une musique'
      }
    },
    Player: {
      screen: Player,
      navigationOptions: {
        title: 'Player'
      }
    }
  },
  optionsColor
)

const DisconnectedUser = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        title: appName
      }
    }
  },
  optionsColor
)

export default createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoading,
      navigationOptions: {
        title: appName
      }
    },
    Connected: {
      screen: LoggedUser
    },
    Disconnected: {
      screen: DisconnectedUser
    }
  },
  optionsGeneral
)
