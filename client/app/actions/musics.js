import { app } from './feathers'


export const ADD_MUSICS = 'ADD_MUSICS'
export const ADD_MUSIC = 'ADD_MUSIC'
export const REMOVE_MUSICS = 'REMOVE_MUSICS'
export const REMOVE_MUSIC = 'REMOVE_MUSIC'

export const addMusics = payload => ({
  type: ADD_MUSICS,
  musics: payload.musics
})
export const addMusic = payload => ({
  type: ADD_MUSIC,
  music: payload.music
})

export const removeMusics = () => ({
  type: REMOVE_MUSICS
})
export const removeMusic = payload => ({
  type: REMOVE_MUSIC,
  id: payload.id
})

let createdListener, removedListener

export const loadMusic = (playlistId) => dispatch => {
  createdListener = (music) => {
    if (music.playlist === playlistId) {
      dispatch(
        addMusic({ music: music })
      )
    }
  }
  removedListener = (music) => {
    dispatch(
      removeMusic({ id: music._id })
    )
  }
  app.service('musics').on('created', createdListener)
  app.service('musics').on('removed', removedListener)

  return app.service('musics').find(
    {
      query: {
        playlist: playlistId,
        $limit: 100,
        $sort: {
          createdAt: -1
        }
      }
    }
  ).then((response) => {
    dispatch(
      addMusics({ musics: response.data })
    )
  })
}

export const unloadMusic = () => dispatch => {
  app.service('musics').removeListener('created', createdListener)
  app.service('musics').removeListener('removed', removedListener)
  dispatch(
    removeMusics()
  )
}

export const createMusic = (music) => dispatch => {
  console.log(music)
  return app.service('musics').create(music)
}
