import { createSwitchNavigator, createStackNavigator} from 'react-navigation'

import {displayName as appName} from '../../app.json'
import Home from '../screens/home'
import AddRoom from '../screens/addRoom'
import ListRooms from '../screens/listRooms'
import Room from '../screens/room'

const optionsGeneral = {
  mode: 'modal',
  headerMode: 'none'
}

const LoggedUser = createStackNavigator({
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
      title: 'Room'
    }
  }
})

const DisconnectedUser = createStackNavigator ({
  Home: {
    screen: Home,
    navigationOptions: {
      title: appName
    }
  }
})

export default createSwitchNavigator(
  {
    Auth: {
      screen: DisconnectedUser
    },
    Home: {
      screen: LoggedUser
    }
  },
  optionsGeneral
)
