import { AsyncStorage } from 'react-native'
import authentication from 'feathers-authentication-client'
import feathers from 'feathers/client'
import hooks from 'feathers-hooks'
import io from 'socket.io-client'
import socketio from 'feathers-socketio/client'

import { API_URL } from '../../config'

const options = {
  transports: ['websocket'],
  pingTimeout: 3000,
  pingInterval: 5000,
  forceNew: true,
  origins: '*:*'
}

const socket = io(API_URL, options)

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

export const reauthenticate = () => dispatch => {
  return app.authenticate()
    .then(response => app.passport.verifyJWT(response.accessToken))
    .then(payload => {
      return app.service('users').get(payload.userId).then((user) => {
        dispatch(
          authenticate({ user })
        )
        return !!payload.userId
      })
    }).catch((e) => {
      // console.log('error:', e)
      return false
    })
}

export const login = (email, password) => dispatch => {
  const payload = {
    strategy: 'local',
    email,
    password
  }
  return app.authenticate(payload)
    .then(response => app.passport.verifyJWT(response.accessToken))
    .then(payload => {
      return app.service('users').get(payload.userId).then((user) => {
        dispatch(
          authenticate({ user })
        )
        return !!payload.userId
      })
    }).catch((e) => {
      // console.log('error:', e)
      return false
    })
}
