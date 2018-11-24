import { combineReducers } from 'redux'


import feathers from './feathers'
import playlists from './playlists'

export default combineReducers({
  feathers,
  playlists
})
