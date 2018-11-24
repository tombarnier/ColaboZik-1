import { app } from './feathers'


export const ADD_MUSICS = 'ADD_MUSICS'
export const ADD_MUSIC = 'ADD_MUSIC'
export const REMOVE_MUSIC = 'REMOVE_MUSIC'

export const addMusics = payload => ({
  type: ADD_MUSICS,
  musics: payload.musics
})
export const addMusic = payload => ({
  type: ADD_MUSIC,
  music: payload.music
})

export const removeMusic = payload => ({
  type: REMOVE_MUSIC,
  id: payload.id
})

export const loadMusic = (playlistId) => dispatch => {
  app.service('musics').on('created', (music) => {
    dispatch(
      addMusic({ music: music })
    )
  })
  app.service('musics').on('removed', (music) => {
    dispatch(
      removeMusic({ id: music._id })
    )
  })
  return app.service('musics').find(
    {
      query: { playlist: playlistId }
    }
  ).then((response) => {
    dispatch(
      addMusics({ musics: response.data })
    )
  })
}

export const createMusic = (music) => dispatch => {
  console.log(music)
  return app.service('musics').create(music)
}
