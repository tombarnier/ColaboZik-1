import {StackNavigator} from 'react-navigation'

import {displayName as appName} from '../../app.json';
import Home from '../screens/home'
import AddRoom from '../screens/addRoom'
import ListRooms from '../screens/listRooms'
import Room from '../screens/room'
import Player from '../screens/player'

const optionsGeneral = {
  mode: 'modal',
  headerMode: 'none'
}

const HomeStack = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: appName
    }
  },
  ListRooms: {
    screen: ListRooms,
    navigationOptions: {
      title: 'Liste des salons'
    }
  },
  AddRoom: {
    screen: AddRoom,
    navigationOptions: {
      title: 'Ajouter un salon'
    }
  },
  Room: {
    screen: Room,
    navigationOptions: {
      title: `Room`
    }
  },
  Player : {
    screen: Player,
    navigationOptions: {
      title: 'Player'
    }
  }
})

export default StackNavigator(
  {
    Home: {
      screen: HomeStack
    }
  },
  optionsGeneral
)
