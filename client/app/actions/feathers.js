import { AsyncStorage } from 'react-native'
import authentication from 'feathers-authentication-client'
import feathers from 'feathers/client'
import hooks from 'feathers-hooks'
import io from 'socket.io-client'
import socketio from 'feathers-socketio/client'

import { API_URL } from '../../config'

const options = {
  pingInterval: 5000,
  pingTimeout: 3000,
  transports: ['websocket'],
  pingInterval: 5000,
  forceNew: true,
  origins: '*:*'
}

const socket = io(API_URL, options)

// Create configure and export feathers client app
export const app = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({
    storage: AsyncStorage // To store our accessToken
  }))

export const AUTHENTICATE = 'AUTHENTICATE'

export const authenticate = payload => ({
  type: AUTHENTICATE,
  user: payload.user
})

// Try to reauthenticate using JWT stored in AsyncStorage
export const reauthenticate = () => dispatch => {
  return app.authenticate()
    .then(response => app.passport.verifyJWT(response.accessToken)) // Verify JWT
    .then(payload => {
      return app.service('users').get(payload.userId).then((user) => {
        // Dispatch authenticate with current user data
        dispatch(
          authenticate({ user })
        )
        return !!payload.userId // Return true if user is a user is find, else return false
      })
    }).catch((e) => {
      // console.log('error:', e)
      return false
    })
}

// Try to authenticate using email and password
export const login = (email, password) => dispatch => {
  // Create payload using user email and password
  const payload = {
    strategy: 'local',
    email,
    password
  }
  return app.authenticate(payload)
    .then(response => app.passport.verifyJWT(response.accessToken)) // Verify JWT
    .then(payload => {
      return app.service('users').get(payload.userId).then((user) => {
        // Dispatch authenticate with current user data
        dispatch(
          authenticate({ user })
        )
        return !!payload.userId // Return true if user is a user is find, else return false
      })
    }).catch((e) => {
      // console.log('error:', e)
      return false
    })
}
