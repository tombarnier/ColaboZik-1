import { combineReducers } from 'redux'

import feathers from './feathers'
import playlists from './playlists'
import musics from './musics'
import themes from './themes'


export default combineReducers({
  feathers,
  playlists,
  musics,
  themes
})
