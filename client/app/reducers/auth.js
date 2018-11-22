import { AUTHENTICATE } from '../actions/auth'
import axios from 'axios'

const initialState = {
  user:{}
}

export default (state = initialState,action) => {
  switch (action.type) {
    case AUTHENTICATE:
      
    default:
      return state
  }
}