import io from 'socket.io-client'
import feathers from 'feathers/client'
import hooks from 'feathers-hooks'
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication-client'
import {AsyncStorage} from 'react-native'

import {API_URL} from '../../config'

const options = {transports: ['websocket'], pingTimeout: 3000, pingInterval: 5000}

const socket = io(API_URL, options)

export const app = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({
    storage: AsyncStorage // To store our accessToken
  }))

export const AUTHENTICATE = 'AUTHENTICATE'

export const authenticate = user => ({
  type: AUTHENTICATE,
  user: user
})

export const reauthenticate = () => dispatch => {
  return app.authenticate()
    .then(response => {
      return app.passport.verifyJWT(response.accessToken)
    })
    .then(payload => {
      dispatch(
        authenticate({
          payload: payload
        })
      )
      return payload.userId ? true : false
    }).catch((e) => {
      // console.log('error:', e)
      return false
    })
}

export const login = (email,pass) => dispatch => {
  const payload = {
    strategy: 'local',
    email: email,
    password: pass
  }
  return app.authenticate(payload)
    .then(response => {
      return app.passport.verifyJWT(response.accessToken)
    })
    .then(payload => {
      dispatch(
        authenticate({
          payload: payload
        })
      )
      return payload.userId ? true : false
    }).catch((e) => {
      // console.log('error:', e)
      return false
    })
}

export const getPlaylists = (userId) => dispatch => {
  const playlists = app.service('playlist').find()
  return playlists
}
