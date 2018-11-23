import { AUTHENTICATE, ADD_PLAYlISTS, ADD_PLAYlIST, REMOVE_PLAYlIST } from '../actions/auth'

const initialState = {
  user: null,
  playlists: []
}

export default (state = initialState,action) => {
  switch (action.type) {
  case AUTHENTICATE:
    return {
      ...state,
      user: action.user
    }
  case ADD_PLAYlISTS:
    return {
      ...state,
      playlists: action.playlists
    }
  case ADD_PLAYlIST:
    return {
      ...state,
      playlists: [...state.playlists, action.playlist]
    }
  case REMOVE_PLAYlIST:
    return {
      ...state,
      playlists: state.playlists.filter((playlist) => playlist._id !== action.id)
    }
  default:
    return state
  }
}
