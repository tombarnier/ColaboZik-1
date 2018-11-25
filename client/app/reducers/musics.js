import { ADD_MUSIC, ADD_MUSICS, REMOVE_MUSIC, REMOVE_MUSICS } from '../actions/musics'


const initialState = {
  musics: []
}

export default (state = initialState, action) => {
  switch (action.type) {
  case ADD_MUSICS:
    return {
      ...state,
      musics: action.musics
    }
  case ADD_MUSIC:
    return {
      ...state,
      musics: [...state.musics, action.music]
    }
  case REMOVE_MUSICS:
    return {
      ...state,
      musics: []
    }
  case REMOVE_MUSIC:
    return {
      ...state,
      musics: state.musics.filter((music) => music._id !== action.id)
    }
  default:
    return state
  }
}