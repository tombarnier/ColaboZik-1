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
export const ADD_PLAYlISTS = 'ADD_PLAYlISTS'
export const ADD_PLAYlIST = 'ADD_PLAYlIST'
export const REMOVE_PLAYlIST = 'REMOVE_PLAYlIST'

export const authenticate = payload => ({
  type: AUTHENTICATE,
  user: payload.user
})

export const addPlaylists = payload => ({
  type: ADD_PLAYlISTS,
  playlists: payload.playlists
})

export const addPlaylist = payload => ({
  type: ADD_PLAYlIST,
  playlist: payload.playlist
})

export const removePlaylist = payload => ({
  type: REMOVE_PLAYlIST,
  id: payload.id
})

export const reauthenticate = () => dispatch => {
  return app.authenticate()
    .then(response => {
      return app.passport.verifyJWT(response.accessToken)
    })
    .then(payload => {
      app.service('users').get(payload.userId).then((user) => {
        dispatch(
          authenticate({
            user
          })
        )
      })
      return payload.userId ? true : false
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
    .then(response => {
      return app.passport.verifyJWT(response.accessToken)
    })
    .then(payload => {
      app.service('users').get(payload.userId).then((user) => {
        dispatch(
          authenticate({
            user
          })
        )
      })
      return payload.userId ? true : false
    }).catch((e) => {
      // console.log('error:', e)
      return false
    })
}

export const getPlaylists = (userId) => dispatch => {
  app.service('playlists').on('created', (playlist) => {
    dispatch(
      addPlaylist({
        playlist: playlist
      })
    )
  })
  app.service('playlists').on('removed', (playlist) => {
    dispatch(
      removePlaylist({
        id: playlist._id
      })
    )
  })
  return app.service('playlists').find().then((response) => {
    dispatch(
      addPlaylists({
        playlists: response.data
      })
    )
  })
}
