import { app } from './feathers'

export const ADD_PLAYLIST = 'ADD_PLAYLIST'
export const ADD_PLAYLISTS = 'ADD_PLAYLISTS'
export const REMOVE_PLAYLIST = 'REMOVE_PLAYLIST'
export const SELECT_PLAYLIST = 'SELECT_PLAYLIST'
export const DESELECT_PLAYLIST = 'DESELECT_PLAYLIST'

export const addPlaylist = payload => ({
  type: ADD_PLAYLIST,
  playlist: payload.playlist
})

export const addPlaylists = payload => ({
  type: ADD_PLAYLISTS,
  playlists: payload.playlists
})

export const removePlaylist = payload => ({
  type: REMOVE_PLAYLIST,
  id: payload.id
})

export const selectPlaylist = payload => ({
  type: SELECT_PLAYLIST,
  id: payload._id
})

export const deselectPlaylist = () => ({
  type: DESELECT_PLAYLIST
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

export const createPlaylist = (playlist) => dispatch =>
  app.service('playlists').create(playlist)
