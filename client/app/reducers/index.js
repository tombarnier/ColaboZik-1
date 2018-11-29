import { combineReducers } from 'redux'

import feathers from './feathers'
import musics from './musics'
import playlists from './playlists'
import themes from './themes'

export default combineReducers({
  feathers,
  playlists,
  musics,
  themes
})
