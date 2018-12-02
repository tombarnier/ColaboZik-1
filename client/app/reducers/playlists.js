import { ADD_PLAYLIST, ADD_PLAYLISTS, DESELECT_PLAYLIST, REMOVE_PLAYLIST, SELECT_PLAYLIST } from '../actions/playlists'

const initialState = {
  currentPlaylist: {},
  playlists: []
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ADD_PLAYLISTS:
    return {
      ...state,
      playlists: action.playlists
    }
  case ADD_PLAYLIST:
    return {
      ...state,
      playlists: [...state.playlists, action.playlist]
    }
  case REMOVE_PLAYLIST:
    return {
      ...state,
      playlists: state.playlists.filter(playlist => playlist._id !== action.id)
    }
  case SELECT_PLAYLIST:
    return {
      ...state,
      currentPlaylist: state.playlists.find(playlist => playlist._id === action.id)
    }
  case DESELECT_PLAYLIST:
    return {
      ...state,
      currentPlaylist: {}
    }
  default:
    return state
  }
}
