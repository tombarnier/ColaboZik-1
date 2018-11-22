import { combineReducers } from 'redux'

import users from './users'
import playlists from './playlists'
import auth from './auth'
import feathers from './feathers'
import musics from './musics'

export default combineReducers({
  users,
  playlists,
  auth,
  feathers,
  musics
})

