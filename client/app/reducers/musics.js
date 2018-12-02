import { ADD_MUSIC, ADD_MUSICS, REMOVE_MUSIC, REMOVE_MUSICS, UPDATE_MUSIC } from '../actions/musics'

const initialState = {
  musics: []
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ADD_MUSIC:
    return {
      ...state,
      musics: [...state.musics, action.music]
    }
  case ADD_MUSICS:
    return {
      ...state,
      musics: action.musics
    }
  case REMOVE_MUSIC:
    return {
      ...state,
      musics: state.musics.filter(music => music._id !== action.id)
    }
  case REMOVE_MUSICS:
    return {
      ...state,
      musics: []
    }
  case UPDATE_MUSIC:
    return {
      ...state,
      musics: state.musics.map(music => music._id === action.id ? action.music : music)
    }
  default:
    return state
  }
}
