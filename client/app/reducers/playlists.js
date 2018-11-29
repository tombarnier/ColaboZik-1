import { ADD_PLAYlIST, ADD_PLAYlISTS, REMOVE_PLAYlIST } from '../actions/playlists'

const initialState = {
  playlists: []
}

export default (state = initialState, action) => {
  switch (action.type) {
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
