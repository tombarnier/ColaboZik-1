import { app } from './feathers'

export const ADD_MUSIC = 'ADD_MUSIC'
export const ADD_MUSICS = 'ADD_MUSICS'
export const REMOVE_MUSIC = 'REMOVE_MUSIC'
export const REMOVE_MUSICS = 'REMOVE_MUSICS'
export const UPDATE_MUSIC = 'UPDATE_MUSIC'

export const addMusic = payload => ({
  type: ADD_MUSIC,
  music: payload.music
})
export const addMusics = payload => ({
  type: ADD_MUSICS,
  musics: payload.musics
})

export const removeMusic = payload => ({
  type: REMOVE_MUSIC,
  id: payload.id
})
export const removeMusics = () => ({
  type: REMOVE_MUSICS
})

export const updateMusic = payload => ({
  type: UPDATE_MUSIC,
  id: payload._id,
  music: payload
})

let createdListener, removedListener, updateListener

export const loadMusic = (playlistId) => dispatch => {
  createdListener = (music) => {
    if (music.playlist === playlistId) {
      dispatch(
        addMusic({ music })
      )
    }
  }

  removedListener = (music) => {
    dispatch(
      removeMusic({ id: music._id })
    )
  }

  updateListener = (music) => {
    dispatch(
      updateMusic(music)
    )
  }

  app.service('musics').on('created', createdListener)
  app.service('musics').on('removed', removedListener)
  app.service('musics').on('patched', updateListener)

  return app.service('musics').find(
    {
      query: {
        playlist: playlistId,
        $limit: 100,
        $sort: {
          createdAt: 1
        }
      }
    }
  ).then((response) => {
    dispatch(
      addMusics({ musics: response.data })
    )
  }).catch((e) => {
    // console.log('error', e)
    return false
  })
}

export const unloadMusic = () => dispatch => {
  app.service('musics').removeListener('created', createdListener)
  app.service('musics').removeListener('removed', removedListener)
  app.service('musics').removeListener('patched', updateListener)
  dispatch(
    removeMusics()
  )
}

export const createMusic = (music) => dispatch =>
  app.service('musics').create(music)

export const deleteMusic = (music) => dispatch =>
  app.service('musics').remove(music)

export const downvoteMusic = (music, playlist, user) => dispatch => {
  if (!music.dislike.includes(user._id)) {
    app.service('musics').patch(music._id, {
      dislike: [...music.dislike, user._id]
    }).then((musicUpdated) => {
      if (musicUpdated.dislike.length >= playlist.members.length / 2) {
        dispatch(
          deleteMusic(musicUpdated._id)
        )
      }
    }).catch((e) => {
      // console.log('error', e)
      return false
    })
  }
}
