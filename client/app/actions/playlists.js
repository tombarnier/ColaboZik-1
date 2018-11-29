import { app } from './feathers'

export const ADD_PLAYlISTS = 'ADD_PLAYlISTS'
export const ADD_PLAYlIST = 'ADD_PLAYlIST'
export const REMOVE_PLAYlIST = 'REMOVE_PLAYlIST'

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

export const loadPlaylists = (user) => dispatch => {
  app.service('playlists').on('created', (playlist) => {
    if (playlist.members.includes(user.email)) {
      dispatch(
        addPlaylist({ playlist: playlist })
      )
    }
  })
  app.service('playlists').on('removed', (playlist) => {
    if (playlist.members.includes(user.email)) {
      dispatch(
        removePlaylist({ id: playlist._id })
      )
    }
  })
  return app.service('playlists').find({
    query: {
      $limit: 100,
      $sort: {
        createdAt: 1
      }
    }
  }).then((response) => {
    dispatch(
      addPlaylists({ playlists: response.data })
    )
  }).catch((e) => {
    // console.log('error', e)
    return false
  })
}

export const createPlaylist = (playlist) => dispatch => {
  return app.service('playlists').create(playlist)
}
