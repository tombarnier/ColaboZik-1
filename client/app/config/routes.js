import {StackNavigator} from 'react-navigation'

import {displayName as appName} from '../../app.json';
import Home from '../screens/home'
import AddRoom from '../screens/addRoom'
import ListRooms from '../screens/listRooms'

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
