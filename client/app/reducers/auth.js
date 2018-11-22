import { AUTHENTICATE } from '../actions/auth'

const initialState = {
  user: {}
}

export default (state = initialState,action) => {
  switch (action.type) {
  case AUTHENTICATE:
    return {
      ...state,
      user: action.payload
    }
  default:
    return state
  }
}