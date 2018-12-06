import { AUTHENTICATE } from '../actions/feathers'

const initialState = {
  user: null
}

export default (state = initialState, action) => {
  switch (action.type) {
  case AUTHENTICATE: // Store logged in user
    return {
      ...state,
      user: action.user
    }
  default:
    return state
  }
}
