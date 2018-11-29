import { AUTHENTICATE } from '../actions/feathers'

const initialState = {
  user: null,
  playlists: []
}

export default (state = initialState, action) => {
  switch (action.type) {
  case AUTHENTICATE:
    return {
      ...state,
      user: action.user
    }
  default:
    return state
  }
}
