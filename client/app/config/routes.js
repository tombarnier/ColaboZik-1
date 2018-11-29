import { createStackNavigator, createSwitchNavigator } from 'react-navigation'

import { displayName as appName } from '../../app.json'
import AddMusic from '../screens/addMusic'
import AddPlaylist from '../screens/addPlaylist'
import AuthLoading from '../screens/authLoading'
import Home from '../screens/home'
import Login from '../screens/login'
import Player from '../screens/player'
import Playlist from '../screens/playlist'

const optionsGeneral = {
  mode: 'modal',
  headerMode: 'none'
}

const LoggedUser = createStackNavigator({
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
    navigationOptions: ({ navigation }) => {
      return {
        title: navigation.getParam('playlist', 'Playlist').name,
      }
    }
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
})

const DisconnectedUser = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: appName
    }
  }
})

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
