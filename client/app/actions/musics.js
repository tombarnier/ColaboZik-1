import { app } from './feathers'

export const ADD_MUSICS = 'ADD_MUSICS'
export const ADD_MUSIC = 'ADD_MUSIC'
export const REMOVE_MUSICS = 'REMOVE_MUSICS'
export const REMOVE_MUSIC = 'REMOVE_MUSIC'
export const DISLIKE_MUSIC = 'DISLIKE_MUSIC'

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
export const dislikeMusic = payload => ({
  type: DISLIKE_MUSIC,
  id: payload._id,
  music: payload
})

let createdListener, removedListener, updateListener

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

  updateListener = (music) => {
    dispatch(
      loadMusic(music.playlist)
    )
  }

  app.service('musics').on('created', createdListener)
  app.service('musics').on('removed', removedListener)
  app.service('musics').on('updated', updateListener)

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
  }).catch((e) => {
    // console.log('error', e)
    return false
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
  return app.service('musics').create(music)
}

export const deleteMusic = (music) => dispatch => {
  return app.service('musics').remove(music)
}

export const downvoteMusic = (music, user) => dispatch => {
  if (music.dislike.length >= 5 ) {
    dispatch(
      deleteMusic(music._id)
    )
  } else {
    if (!music.dislike.includes(user._id)) music.dislike.push(user._id)
    return app.service('musics').patch(music._id,{
      dislike: music.dislike
    }).then(() => {
      dispatch (
        dislikeMusic(music)
      )
    }).catch((e) => {
      // console.log('error', e)
      return false
    })
  }
}
