import { combineReducers } from 'redux'

import feathers from './feathers'
import playlists from './playlists'
import musics from './musics'


export default combineReducers({
  feathers,
  playlists,
  musics
})
