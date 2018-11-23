import { createSwitchNavigator, createStackNavigator} from 'react-navigation'

import {displayName as appName} from '../../app.json'
import AuthLoading from '../screens/authLoading'
import Login from '../screens/login'
import Home from '../screens/home'
import AddPlaylist from '../screens/addPlaylist'
import Playlist from '../screens/playlist'
import Player from '../screens/player'
import AddMusic from '../screens/addMusic'

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
    navigationOptions: ({navigation}) => {
      return {
        title: navigation.getParam('playlist', 'Playlist').title,
      }
    }
  },
  AddMusic: {
    screen: AddMusic,
    navigationOptions: {
      title: 'Ajouter une musique'
    }
  },
  Player : {
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
