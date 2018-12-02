import { ADD_MUSIC, ADD_MUSICS, REMOVE_MUSIC, REMOVE_MUSICS, UPDATE_MUSIC } from '../actions/musics'

const initialState = {
  musics: []
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ADD_MUSICS: // Add bunch of musics
    return {
      ...state,
      musics: action.musics
    }
  case ADD_MUSIC: // Add music
    return {
      ...state,
      musics: [...state.musics, action.music]
    }
  case REMOVE_MUSIC: // Remove music by id
    return {
      ...state,
      musics: state.musics.filter(music => music._id !== action.id)
    }
  case REMOVE_MUSICS: // Remove all musics
    return {
      ...state,
      musics: []
    }
  case UPDATE_MUSIC: // Replace music by id
    return {
      ...state,
      musics: state.musics.map(music => music._id === action.id ? action.music : music)
    }
  default:
    return state
  }
}
