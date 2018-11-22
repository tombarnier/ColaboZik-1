import { combineReducers } from 'redux'

import users from './users'
import playlists from './playlists'
import auth from './auth'

export default combineReducers({
  users,
  playlists,
  auth
})

