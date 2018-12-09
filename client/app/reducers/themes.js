import { CHANGE_THEME } from '../actions/themes'
import { themeDark, themeLight } from '../config/themes'

const initialState = {
  currentTheme: themeDark
}

export default (state = initialState, action) => {
  switch (action.type) {
  case CHANGE_THEME:
    return {
      ...state,
      currentTheme: action.theme
    }
  default:
    return { ...state }
  }
}
