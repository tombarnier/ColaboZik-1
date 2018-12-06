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

// Load the musics of a playlist and add listeners
export const loadMusic = (playlistId) => dispatch => {
  // Create the listeners for current playlist
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

  // Add listeners
  app.service('musics').on('created', createdListener)
  app.service('musics').on('removed', removedListener)
  app.service('musics').on('patched', updateListener)

  // Get the playlist's musics
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

// Unload the current playlist's musics
export const unloadMusic = () => dispatch => {
  app.service('musics').removeListener('created', createdListener)
  app.service('musics').removeListener('removed', removedListener)
  app.service('musics').removeListener('patched', updateListener)
  dispatch(
    removeMusics()
  )
}

// Create new music
export const createMusic = (music) => dispatch =>
  app.service('musics').create(music)

// Detele music
export const deleteMusic = (musicId) => dispatch =>
  app.service('musics').remove(musicId)

// Downvote a music
export const downvoteMusic = (music, playlist, user) => dispatch => {
  if (!music.dislike.includes(user._id)) { // Check if user haven't already downvote the music
    app.service('musics').patch(music._id, {
      dislike: [...music.dislike, user._id] // Add the user id to the list of downvotes
    }).then((musicUpdated) => {
      if (musicUpdated.dislike.length >= playlist.members.length / 2) {
        // Remove the music if more than 50% of the members have downvoted it
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
